import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { ErrorHandler } from '../helpers/error';
import config from '../config/index';

type Property = 'body' | 'params';

const middleware = (schema?: Joi.Schema, property?: Property) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (schema && property) {
            const { error }: { error?: Joi.ValidationError } = schema.validate(req[property]);

            if (!error) {
                // eslint-disable-next-line callback-return
                next();
            } else {
                const { details } = error;
                const message = details.map(item => item.message).join(',');
    
                throw new ErrorHandler(400, message);
            }
        } else {
            const token = req.headers['x-access-token'] as string;

            if (!token) {
                throw new ErrorHandler(401, 'No token provided');
            }

            try {
                jwt.verify(token, config.JWTSecret);
            } catch (error) {
                throw new ErrorHandler(403, 'Failed to authenticate token.');
            }

            next();
        }
    };
};

export default middleware;
