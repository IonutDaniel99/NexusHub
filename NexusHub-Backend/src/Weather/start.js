import express from 'express';
import {createServer} from 'http';
import {Server} from 'socket.io';
import cors from 'cors';

// Configs Imports
import {logger} from './src/utils/winston_logger.js';
import {objectToSendFunc} from './src/utils/data_send.js';

const app = express();
const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
    },
});
const WEATHER_MICROSERVICE_PORT = 5002;
const SERVICE_NAME = 'WEATHER';


app.use(cors());

app.get('/', (req, res) => {
    logger.info(`Someone join on ${SERVICE_NAME}`);
    res.sendStatus(200);
});

app.get('/status', (req, res) => {
    logger.info(`Someone check status for ${SERVICE_NAME}`);
    res.sendStatus(200);
});


let cachedWeatherData = null;
let lastFetchedTime = 0;
app.get('/getWeatherStatus', async (req, res) => {
    const latitude = req.query.latitude;
    const longitude = req.query.longitude;
    const api = req.query.api;

    // Check the timestamp of the last fetched data
    const currentTime = Date.now();
    const timeElapsed = currentTime - lastFetchedTime;

    logger.info(`Weather request initiated for ${api}!`);

    if (timeElapsed < 600000 && cachedWeatherData !== null) { // Less than 10 minutes (600,000 milliseconds)
        // Return the cached data if within the time limit
        logger.warn('Served weather cached data!')
        const responseData = {
            data: JSON.parse(cachedWeatherData),
            lastFetchedTime: lastFetchedTime
        };
        res.status(200).send(responseData);
    } else {
        logger.info('Requested new OpenWeatherMap!')
        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${api}&units=metric&cnt=6`;
        try {
            const response = await fetch(url);
            const body = await response.text();

            // Update the cached data and timestamp
            cachedWeatherData = body;
            lastFetchedTime = currentTime;

            const responseData = {
                data: JSON.parse(body),
                lastFetchedTime: lastFetchedTime
            };
            res.status(200).send(responseData);
        } catch (error) {
            logger.error(`Weather for API ${api} failed with error ${error}`);
            res.sendStatus(401);
        }
    }
});

io.on('connection', (socket) => {
    logger.info(`${socket.id} user connected`);
    socket.emit('weatherStatusUpdate', objectToSendFunc("info", "Weather service start!", SERVICE_NAME));
});

server.listen(WEATHER_MICROSERVICE_PORT, () => {
    logger.info(`${SERVICE_NAME} service start succsesfuly on port ${WEATHER_MICROSERVICE_PORT}.`)
});
