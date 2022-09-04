import { Request, Response, NextFunction } from "express";
import { KeySchema } from "../schemas/headerSchema";

export function headerValidation (req: Request, res:Response, next:NextFunction){
    const { "x-api-key":  API_KEY} = req.headers;
    const validation = KeySchema.validate({API_KEY}, {abortEarly: false});
    if(validation.error) throw new Error("error_unprocessabled_entity");
    
    res.locals.API_KEY = API_KEY
    next();
}