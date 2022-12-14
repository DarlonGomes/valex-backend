import Joi from "joi";

export const activateCardSchema = Joi.object({
    cardId: Joi.number().positive().integer().required(),
    securityCode: Joi.string().regex(new RegExp("^[0-9]{3}")).length(3).required(),
    password : Joi.string().regex(new RegExp("^[0-9]{4}")).length(4).required()
});

export const statusCardSchema = Joi.object({
    cardId: Joi.number().positive().integer().required(),
    password : Joi.string().regex(new RegExp("^[0-9]{4}")).length(4).required()
});

export const valueSchema = Joi.object({
    cardId: Joi.number().positive().integer().required(),
    value: Joi.number().integer().positive().required()
});

export const physicalPurchase = Joi.object({
    cardId: Joi.number().positive().integer().required(),
    businessId: Joi.number().positive().integer().required(),
    cardPassword: Joi.string().regex(new RegExp("^[0-9]{4}")).length(4).required(),
    value: Joi.number().positive().integer().required()
});

export const balanceSchema = Joi.object({
    cardId: Joi.number().positive().integer().required()
});