import * as cardRepository from "../repositories/cardRepository";
import { BusinessesType, Card } from "../interfaces/cardInterface";
import { ErrorInfo } from "../middlewares/errorMiddleware";

export async function checkIfUserHaveThisCard (cardType: BusinessesType, employeeId: number,){
    const card = await cardRepository.findByTypeAndEmployeeId(cardType, employeeId);
    if(card) throw new ErrorInfo("error_conflict", "This employee already have this card");
}

export async function checkIfCardExists ( number: string, cardholderName: string, expirationDate: string) {
    const card = await cardRepository.findByCardDetails(number, cardholderName, expirationDate);
    if(!card) throw new ErrorInfo("error_not_found", "This card doesn't exists");
    return card
}

export async function checkIfCardIsActive (card : Card){
    if(card.password === null) throw new ErrorInfo("error_conflict", "This card is already active");
    
}

export async function checkCardValidation (){

}