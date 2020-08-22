import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

type Property = 'body' | 'params';

const middleware = (schema: Joi.Schema, property: Property) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error }: { error?: Joi.ValidationError } = schema.validate(req[property]);

        if (!error) {
            // eslint-disable-next-line callback-return
            next();
        } else {
            const { details } = error;
            const message = details.map(item => item.message).join(',');

            res.status(400).json({ error: message });
        }
    };
};

export default middleware;
