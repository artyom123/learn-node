import fs from 'fs';
import winston from 'winston';

if (!fs.existsSync('logs')) {
  fs.mkdirSync('logs');
}

const winstonFormat = winston.format.printf((info: any) => {
    console.log('=======???>>> ', info.level, info.message);

    switch (info.level) {
        case 'error':
            console.log('==================<<<<< ', info.message.method_name);
            if (!info.message.method_name) {
                return `@ ${info.timestamp} - ${info.level}: MESSAGE: ${info.message.info}`;
            }

            return `@ ${info.timestamp} - ${info.level}: METHOD NAME: ${info.message.method_name}, PARAMS: ${JSON.stringify(info.message.params)}, MESSAGE: ${info.message.info}`;
        default:
            return `@ ${info.timestamp} - ${info.level}: METHOD: ${info.message.method}, PARAMS: ${JSON.stringify(info.message.body)}`;
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
