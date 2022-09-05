import Joi from "joi";

export const activateCardSchema = Joi.object({
    number: Joi.string().required(),
    cardholderName: Joi.string().required(),
    creditCardCVC: Joi.string().regex(new RegExp("^[0-9]{3}")).length(3).required(),
    expirationDate: Joi.string().required(),
    password : Joi.string().regex(new RegExp("^[0-9]{4}")).length(4).required()
})