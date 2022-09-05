import { Request, Response, NextFunction} from "express"
import * as schema from "../schemas/cardSchema";
import {ErrorInfo } from "../middlewares/errorMiddleware";
import { CardUpdateData } from "../interfaces/cardInterface";
import { Exchange } from "../interfaces/paymentInterface";

export const schemaValidation =  {
    activateCard : (req: Request<{},{}, CardUpdateData>, _res:Response, next: NextFunction) => {
        const dataObject = req.body;
        const validation = schema.activateCardSchema.validate(dataObject, {abortEarly: false})
        if(validation.error) throw new ErrorInfo("error_unprocessable_entity", validation.error.message);
        next();
    },
    changeStatus: (req: Request<{},{}, CardUpdateData>, _res:Response, next: NextFunction) => {
        const dataObject = req.body;
        const validation = schema.statusCardSchema.validate(dataObject, {abortEarly: false});
        if(validation.error) throw new ErrorInfo("error_unprocessable_entity", validation.error.message);
        next();
    },
    checkValue: (req: Request<{},{}, Exchange>, _res:Response, next: NextFunction)=>{
        const dataObject = req.body;
        const validation = schema.valueSchema.validate(dataObject, {abortEarly: false});
        if(validation.error) throw new ErrorInfo("error_unprocessable_entity", validation.error.message);
        next();
    }
}