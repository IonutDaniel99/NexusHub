import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

// Configs Imports
import { SERVICE_NAMES } from '../../common/constants.js';
import { CORS_CONFIGURATION, WEATHER_MICROSERVICE_PORT } from '../../server/microservices_configs.js';
import { objectToSendFunc } from '../../utils/data_send.js';
import { logger } from '../../utils/winston_logger.js';

const app = express();
const server = createServer(app);
const io = new Server(server, CORS_CONFIGURATION);

const service_name = SERVICE_NAMES['WEATHER'];

app.use(cors());

app.get('/', (req, res) => {
    logger.info(`Someone join on ${service_name}`);
    res.sendStatus(200);
});

io.on('connection', (socket) => {
    logger.info(`${socket.id} user connected`);
    socket.emit('weatherStatusUpdate', objectToSendFunc("info", "Weather service start!", service_name));
});

server.listen(WEATHER_MICROSERVICE_PORT, () => {
    logger.info(`${service_name} service start succsesfuly on port ${WEATHER_MICROSERVICE_PORT}.`)
});
