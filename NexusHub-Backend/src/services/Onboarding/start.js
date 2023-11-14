// System Variabiles
import express from 'express';
import cors from 'cors';
import {PrismaClient} from '@prisma/client';
import {logger} from '../../utils/winston_logger.js';
import {GLOBAL_ONBOARDING_MICROSERVICE_PORT} from "../../urlConfigs.js";


const ONBOARDING_MICROSERVICE_PORT = GLOBAL_ONBOARDING_MICROSERVICE_PORT;
const SERVICE_NAME = 'ONBOARDING';
const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.listen(ONBOARDING_MICROSERVICE_PORT, () => {
    logger.info(`${SERVICE_NAME} service start succsesfuly on port ${ONBOARDING_MICROSERVICE_PORT}.`);
});

app.get('/', (req, res) => {
    logger.info(`Someone join on ${SERVICE_NAME}`);
    res.sendStatus(200);
});

app.get('/status', (req, res) => {
    logger.info(`Someone check status for ${SERVICE_NAME}`);
    res.sendStatus(200);
});

app.get('/getUserData', async (req, res) => {
    const user_id = req.query.user_id
    logger.info(`User ${user_id} requested account data!`);
    await prisma.user.findFirst({
        where: {
            uuid_string: user_id
        }
    })
        .then((data) => {
            if (data === null) {
                logger.error(`${user_id} doesnt exist in DB. Throw 404!`)
                return res.sendStatus(404)
            } else {
                return res.status(200).send(data)
            }
        })
        .catch((error) => {
            logger.error(`User ${user_id} failed with error ${error}`);
            res.sendStatus(401);
        });
});

app.post('/register/save', async (req, res) => {
    const user_data = req.body.user_data;
    await prisma.user
        .create({
            data: {
                uuid_string: user_data.uuid_string,
                account_name: user_data.account_name,
                latitude: user_data.latitude,
                longitude: user_data.longitude,
                city_name: user_data.city_name,
                openweathermap_api: user_data.openweathermap_api
            },
        })
        .then(() => res.sendStatus(200))
        .catch((error) => {
            logger.error(`User ${user_data.account_name} failed with error ${error}`);
            res.sendStatus(401);
        });
    logger.info(`${user_data.account_name} has registered!`);

});

app.get('/users', async (req, res) => {
    try {
        const users = await prisma.user.findMany()
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({error: 'Error fetching users'});
    }
});







