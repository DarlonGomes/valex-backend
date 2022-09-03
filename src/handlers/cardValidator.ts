import * as cardRepository from "../repositories/cardRepository.js";
import { BusinessesType } from "../interfaces/cardInterface.js";
import { ErrorInfo } from "../middlewares/errorMiddleware.js";

export async function checkIfUserHaveThisCard (cardType: BusinessesType, employeeId: number,){
    const card = await cardRepository.findByTypeAndEmployeeId(cardType, employeeId);
    if(card) throw new ErrorInfo("error_conflict", "This employee already have this card");
    
}