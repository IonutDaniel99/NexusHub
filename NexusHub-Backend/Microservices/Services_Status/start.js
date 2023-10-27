import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import request from "request"

// Configs Imports
import { logger } from './src/utils/winston_logger.js';
import { microservices_url } from './config/microservices_url.js';

const app = express();
const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
    },
});
const PORT = 9998;
const SERVICE_NAME = 'GLOBAL';


app.use(cors());

app.get('/', (req, res) => {
    logger.info(`Someone join on ${SERVICE_NAME}`);
    res.sendStatus(200);
});

app.get('/services-status', async (req, res) => {
    logger.info(`Services Status Requested!`);
    const microserviceStatus = [];
    await Promise.all(
        Object.entries(microservices_url).map(async ([serviceName, url]) => {
            try {
                const response = await makeRequest(url);
                if (response.statusCode !== 200) {
                    microserviceStatus.push({
                        service_name: serviceName,
                        status_code: response.statusCode,
                        error: null,
                    });
                } else {

                    microserviceStatus.push({
                        service_name: serviceName,
                        status_code: response.statusCode,
                        error: null,
                    });
                }
            } catch (error) {
                console.log(error)
                microserviceStatus.push({
                    service_name: serviceName,
                    status_code: 503,
                    error: error.message,
                });
            }
        })
    );
    res.status(200).json(microserviceStatus);
    logger.info(`Services Status Fulfilled!`);
});

server.listen(PORT, () => {
    logger.info(`${SERVICE_NAME} service start succsesfuly on port ${PORT}.`)
});


function makeRequest(url) {
    return new Promise((resolve, reject) => {
        request(url, (error, response) => {
            if (error) {
                reject(error);
            } else {
                resolve(response);
            }
        });
    });
}