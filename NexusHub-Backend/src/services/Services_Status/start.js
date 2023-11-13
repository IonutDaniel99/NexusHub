import express from 'express';
import {createServer} from 'http';
import cors from 'cors';
import request from "request"

import {logger} from '../../utils/winston_logger.js';
import {microservices_url} from '../../utils/microservices_url.js';
import {GLOBAL_SERVICE_STATUS_PORT} from "../../urlConfigs.js";

const app = express();
const server = createServer(app);

const PORT = GLOBAL_SERVICE_STATUS_PORT;
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
                const response = await makeRequest(url + '/status');
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