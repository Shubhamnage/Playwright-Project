
import winston from 'winston';
import path from 'path';
import fs from 'fs';

const logDirectory = path.join(process.cwd(), 'logs');

if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory, { recursive: true });
}

const logger = winston.createLogger({

    level: 'debug',

    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),

        winston.format.errors({ stack: true }),

        winston.format.printf(({ timestamp, level, message, stack }) => {
            return `${timestamp} [${level.toUpperCase()}] ${stack || message}`;
        })
    ),

    transports: [
        new winston.transports.Console(),

        new winston.transports.File({
            filename: path.join(logDirectory, 'execution.log')
        })
    ]
});

export default logger;
