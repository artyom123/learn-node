import Joi from 'joi';

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
