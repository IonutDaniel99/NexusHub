import { PrismaClient } from '@prisma/client'
import express from 'express';
import cors from "cors"

import { SERVICE_NAMES } from '../../common/constants.js';
import { ONBOARDING_MICROSERVICE_PORT } from '../../configs/microservices_configs.js';
import { logger } from '../../utils/winston_logger.js';

const app = express();
const service_name = SERVICE_NAMES['ONBOARDING'];
const prisma = new PrismaClient()

app.use(cors())
app.use(express.json())

app.listen(ONBOARDING_MICROSERVICE_PORT, () => {
    logger.info(`${service_name} service start succsesfuly on port ${ONBOARDING_MICROSERVICE_PORT}.`);
});

app.get('/', (req, res) => {
    logger.info(`Someone join on ${service_name}`);
    res.sendStatus(200);
});
app.post('/register/save', async (req, res) => {
    const user_data = req.body.user_data
    logger.info(`${user_data.account_name} has registered!`);
    await prisma.user.create({
        data: {
            account_name: user_data.account_name,
            latitude: user_data.latitude,
            longitude: user_data.longitude,
            city_name: user_data.city_name,
        }
    }).then(() => res.sendStatus(200)).catch(() => res.sendStatus(401))
})

app.get('/users', async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching user' });
    }
});