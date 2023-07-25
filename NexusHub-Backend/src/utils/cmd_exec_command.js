import chalk from 'chalk';
import { SERVICE_NAMES } from '../common/constants.js';
import { logger } from './winston_logger.js';

export const execErrorHandler = (serviceName, error) => {
    if (!error) return;
    logger.error(`Error occured at initialization of service ${SERVICE_NAMES[serviceName]} with error code: ${error}`);
};
