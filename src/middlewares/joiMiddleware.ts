import { Request, Response, NextFunction} from "express"
import * as schema from "../schemas/cardSchema";
import {ErrorInfo } from "../middlewares/errorMiddleware";
import { CardBalance, CardStatus, CardUpdateData } from "../interfaces/cardInterface";
import { Exchange, PhysicalPurchase } from "../interfaces/paymentInterface";

export const schemaValidation =  {
    activateCard : (req: Request<{},{}, CardUpdateData>, _res:Response, next: NextFunction) => {
        const dataObject = req.body;
        const validation = schema.activateCardSchema.validate(dataObject, {abortEarly: false})
        if(validation.error) throw new ErrorInfo("error_unprocessable_entity", validation.error.message);
        next();
    },
    changeStatus: (req: Request<{},{}, CardStatus>, _res:Response, next: NextFunction) => {
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
    },
    physicalPurchase: (req: Request < {}, {}, PhysicalPurchase>, _res: Response, next: NextFunction) => {
        const dataObject = req.body;
        const validation = schema.physicalPurchase.validate(dataObject, {abortEarly: false});
        if(validation.error) throw new ErrorInfo("error_unprocessable_entity", validation.error.message);
        next();
    },
    balance: (req: Request< {}, {}, CardBalance>, _res: Response, next: NextFunction) => {
        const dataObject = req.params;
        const validation = schema.balanceSchema.validate(dataObject, {abortEarly: false});
        if(validation.error) throw new ErrorInfo("error_unprocessable_entity", validation.error.message);
        next();
    }
}