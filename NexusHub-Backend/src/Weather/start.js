import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

// Configs Imports
import { logger } from './src/utils/winston_logger.js';
import { objectToSendFunc } from './src/utils/data_send.js';

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

io.on('connection', (socket) => {
    logger.info(`${socket.id} user connected`);
    socket.emit('weatherStatusUpdate', objectToSendFunc("info", "Weather service start!", SERVICE_NAME));
});

server.listen(WEATHER_MICROSERVICE_PORT, () => {
    logger.info(`${SERVICE_NAME} service start succsesfuly on port ${WEATHER_MICROSERVICE_PORT}.`)
});
