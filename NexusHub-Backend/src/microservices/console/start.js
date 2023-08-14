import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

import { SERVICE_NAMES } from '../../common/constants.js';
import { CONSOLE_MICROSERVICE_PORT as consolePort, CORS_CONFIGURATION } from '../../server/microservices_configs.js';
import { objectToSendFunc } from '../../utils/data_send.js';
import { logger } from '../../utils/winston_logger.js';

const app = express();
const server = createServer(app);
const io = new Server(server, CORS_CONFIGURATION);
const service_name = SERVICE_NAMES['CONSOLE'];

app.get('/', (req, res) => {
    logger.info(`Someone join on ${service_name}`);
    res.sendStatus(200);
});


io.on('connection', (socket) => {
    logger.info('a user connectedd');
    socket.emit('consoleStatusUpdate', objectToSendFunc("info", "Console service start!", service_name));
});

server.listen(consolePort, () => {
    logger.info(`${service_name} service start succsesfuly on port ${consolePort}.`);
});
