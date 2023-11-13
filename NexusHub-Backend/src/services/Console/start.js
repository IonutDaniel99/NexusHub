import express from 'express';
import {createServer} from 'http';
import {logger} from '../../utils/winston_logger.js';
import cors from "cors";
import {GLOBAL_CONSOLE_MICROSERVICE_PORT} from "../../urlConfigs.js";

const app = express();
const server = createServer(app);

const SERVICE_NAME = 'CONSOLE';
const CONSOLE_MICROSERVICE_PORT = GLOBAL_CONSOLE_MICROSERVICE_PORT;

app.use(cors());

app.get('/', (req, res) => {
    logger.info(`Someone join on ${SERVICE_NAME}`);
    res.sendStatus(200);
});

app.get('/status', (req, res) => {
    logger.info(`Someone check status for ${SERVICE_NAME}`);
    res.sendStatus(200);
});


server.listen(CONSOLE_MICROSERVICE_PORT, () => {
    logger.info(`${SERVICE_NAME} service start succsesfuly on port ${CONSOLE_MICROSERVICE_PORT}.`);
});
