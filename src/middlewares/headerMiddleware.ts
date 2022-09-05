import { Request, Response, NextFunction } from "express";
import { KeySchema } from "../schemas/headerSchema";
import { ErrorInfo } from "./errorMiddleware";

export function headerValidation (req: Request, res:Response, next:NextFunction){
    const { "x-api-key":  API_KEY} = req.headers;
    const validation = KeySchema.validate({API_KEY}, {abortEarly: false});
    if(validation.error) throw new ErrorInfo("error_unprocessable_entity", validation.error.message);
    
    res.locals.API_KEY = API_KEY
    next();
}