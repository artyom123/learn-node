import fs from 'fs';
import winston from 'winston';

if (!fs.existsSync('logs')) {
  fs.mkdirSync('logs');
}

const winstonFormat = winston.format.printf((info: any) => {

    switch (info.level) {
        case 'error':
            if (!info.message.method_name) {
                return `@ ${info.timestamp} - ${info.level}: MESSAGE: ${info.message.info}`;
            }

            return `@ ${info.timestamp} - ${info.level}: METHOD NAME: ${info.message.method_name}, PATH: ${info.message.path}, PARAMS: ${JSON.stringify(info.message.params)}, MESSAGE: ${info.message.info}`;
        default:
            return `@ ${info.timestamp} - ${info.level}: METHOD: ${info.message.method}, PATH: ${info.message.path}, PARAMS: ${JSON.stringify(info.message.body)}`;
    };
});

export const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp(),
        winstonFormat,
      ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: "logs/logger.log" }),
    ],
});
