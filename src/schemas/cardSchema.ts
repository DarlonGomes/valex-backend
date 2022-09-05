import Joi from "joi";

export const activateCardSchema = Joi.object({
    id: Joi.number().integer().required(),
    securityCode: Joi.string().regex(new RegExp("^[0-9]{3}")).length(3).required(),
    password : Joi.string().regex(new RegExp("^[0-9]{4}")).length(4).required()
})

export const statusCardSchema = Joi.object({
    id: Joi.number().integer().required(),
    password : Joi.string().regex(new RegExp("^[0-9]{4}")).length(4).required()
})

export const valueSchema = Joi.object({
    id: Joi.number().integer().required(),
    value: Joi.number().integer().positive().required()
})
