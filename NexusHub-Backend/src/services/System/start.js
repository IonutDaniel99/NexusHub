import express from 'express';
import {createServer} from 'http';
import {Server} from 'socket.io';
import cors from 'cors';

// Configs Imports
import {logger} from '../../utils/winston_logger.js';
import {getSystemInformation} from "./utils/getSystemInformation.js";
import {GLOBAL_SYSTEM_MICROSERVICE_PORT} from "../../urlConfigs.js";

const app = express();
const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
    },
});
const SYSTEM_MICROSERVICE_PORT = GLOBAL_SYSTEM_MICROSERVICE_PORT;
const SERVICE_NAME = 'SYSTEM';


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
    logger.info("A connection has been established!")
    const interval = setInterval(async () => {
        const all_data = await getSystemInformation()
        io.emit('systemHealthUpdate', all_data);
    }, 10000);

    // If the socket is disconnected, clear the interval to stop emitting
    socket.on('disconnect', () => {
        clearInterval(interval);
    });
});

server.listen(SYSTEM_MICROSERVICE_PORT, () => {
    logger.info(`${SERVICE_NAME} service start successfully on port ${SYSTEM_MICROSERVICE_PORT}.`)
});
