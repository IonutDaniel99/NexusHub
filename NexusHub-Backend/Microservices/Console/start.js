import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { logger } from './utils/winston_logger.js';

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
    },
});
const SERVICE_NAME = 'CONSOLE';
const CONSOLE_MICROSERVICE_PORT = 5001;

app.get('/', (req, res) => {
    logger.info(`Someone join on ${SERVICE_NAME}`);
    res.sendStatus(200);
});


io.on('connection', (socket) => {
    logger.info('a user connectedd');
    socket.emit('consoleStatusUpdate', objectToSendFunc("info", "Console service start!", SERVICE_NAME));
});

server.listen(CONSOLE_MICROSERVICE_PORT, () => {
    logger.info(`${SERVICE_NAME} service start succsesfuly on port ${CONSOLE_MICROSERVICE_PORT}.`);
});
