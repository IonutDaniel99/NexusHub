import { createLogger, format, transports } from 'winston';

export const logger = createLogger({
    format: format.combine(
        format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss:SSS' }),
        format.colorize(),
        format.printf(info => {
            return `[${info.timestamp}] ${info.level} : ${info.message}`
        }),
    ),
    transports: [
        new transports.Console({ level: 'debug' }),
    ]
});