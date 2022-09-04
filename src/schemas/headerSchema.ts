import Joi from "joi";

export const KeySchema = Joi.object({
    API_KEY: Joi.string().required()
})