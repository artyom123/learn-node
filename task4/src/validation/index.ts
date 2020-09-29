import Joi from 'joi';

import { Premission } from '../types/group';

const arrayPermission: Premission[] = ['READ', 'DELETE', 'SHARE', 'WRITE', 'UPLOAD_FILES'];

export const userSchema = Joi.object().keys({
    login: Joi.string().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{2,20}$')).required(),
    age: Joi.number().min(4).max(130).required()
});

export const infoSchema = Joi.object().keys({
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{2,20}$')),
    age: Joi.number().min(4).max(130)
});

export const idScheme = Joi.object().keys({
    id: Joi.string().uuid().required()
});

export const groupSchema = Joi.object().keys({
    name: Joi.string().required(),
    permissions: Joi.array().items(Joi.string().valid(...arrayPermission)).required(),
    users: Joi.array().items(Joi.string().uuid()).min(1).default(null),
});
