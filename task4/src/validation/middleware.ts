import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

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
    
                res.status(400).json({ error: message });
            }
        } else {
            const token = req.headers['x-access-token'] as string;

            if (!token) {
                return res.status(401).send('No token provided');
            }

            try {
                jwt.verify(token, config.JWTSecret);
            } catch (error) {
                return res.status(403).send('Failed to authenticate token.');
            }

            next();
        }
    };
};

export default middleware;
