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

export async function checkIfCardExists ( cardId: number) {
    const card = await cardRepository.findById(cardId);
    if(!card) throw new ErrorInfo("error_not_found", "This card doesn't exists");
    return card
}

export async function checkIfCardIsActive (card : Card, method: |"block" | "unlock" | "activate" | "default"){
    if(method === "activate" && card.password !== null) throw new ErrorInfo("error_conflict", "This card is already active");
    if(method !== "activate" && card.password === null) throw new ErrorInfo("error_conflict", "This card isn't active");
}

export async function checkCardValidation (date: string){
    const today = dayjs(dayjs(), "MM/YY");
    const expirationDate = dayjs(date, "MM/YY")
    const response: boolean = today.isSameOrAfter(expirationDate, "month");
    if(response) throw new ErrorInfo("error_conflict", "This card has expired");
}

export async function checkCardCVC ( securityCode : string, card : Card){
    const encryptedCVC = encryptUtilts.decryptData(card.securityCode);
    if(encryptedCVC !== securityCode) throw new ErrorInfo("error_conflict", "The security code doesn't match");
}

export async function checkCardStatus(card: Card, method: | "block" | "unlock" | "activate" | "default"){
    if(method === "block" && card.isBlocked) throw new ErrorInfo("error_conflict", "This card is already blocked");
    if(method === "unlock" && !card.isBlocked) throw new ErrorInfo("error_conflict", "This card is already unblocked");
    if(method === "default" && card.isBlocked) throw new ErrorInfo("error_conflict", "Denied. This card is blocked");

}

export async function checkPassword (card: Card, password: string){
    const response : boolean = encryptUtilts.validateBcryptData(password, card.password!)
    if(!response) throw new ErrorInfo("error_conflict", "Password doesn't match");
}

export async function checkCardBalance (cardId: number, amount: number){
    const {balance} = await cardRepository.receipt(cardId);
    console.log(balance)
    if((balance - amount) < 0) throw new ErrorInfo("error_conflict", "You don't have enough funds");
}