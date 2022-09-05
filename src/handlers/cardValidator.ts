import * as cardRepository from "../repositories/cardRepository";
import { BusinessesType, Card } from "../interfaces/cardInterface";
import { ErrorInfo } from "../middlewares/errorMiddleware";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs from "dayjs";
import { encryptUtilts } from "../utils/cryptUtils";
dayjs.extend(customParseFormat);
dayjs.extend(isSameOrAfter);



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
    if(card.password !== null) throw new ErrorInfo("error_conflict", "This card is already active");
}

export async function checkCardValidation (date: string){
    const today = dayjs(dayjs(), "MM/YY");
    const expirationDate = dayjs(date, "MM/YY")
    const response: boolean = today.isSameOrAfter(expirationDate, "month");
    if(response) throw new ErrorInfo("error_conflict", "This card has expired");
}

export async function checkCardCVC ( CVC : string, card : Card){
    const encryptedCVC = encryptUtilts.decryptData(card.securityCode);
    if(encryptedCVC !== CVC) throw new ErrorInfo("error_conflict", "The security code doesn't match");
}