import { Request, Response, NextFunction} from "express"
import * as schema from "../schemas/cardSchema";
import {ActivateEmployeeCard} from "../interfaces/employeeInterface"
import {ErrorInfo } from "../middlewares/errorMiddleware";

export const schemaValidation =  {
    activateCard : (req: Request<{},{}, ActivateEmployeeCard>, _res:Response, next: NextFunction) => {
        const dataObject = req.body
        const validation = schema.activateCardSchema.validate(dataObject, {abortEarly: false})
        if(validation.error) throw new ErrorInfo("error_unprocessable_entity", validation.error.message);
        next();
    },
}