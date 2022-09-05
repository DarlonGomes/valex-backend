import * as cardRepository from "../repositories/cardRepository";
import * as rechargeRepository from "../repositories/rechargeRepository";
import * as companyValidator from "../handlers/companyValidator";
import * as employeeValidator from "../handlers/employeeValidator";
import * as cardValidator from "../handlers/cardValidator";
import { BusinessesType, Card} from "../interfaces/cardInterface";
import { generateCreditCardInfo } from "../utils/cardUtils";
import { encryptUtilts } from "../utils/cryptUtils";


export async function createCardValidation (key:string, employeeId:number, cardType: BusinessesType){
    const companyId : number = await companyValidator.KeyValidation(key);
    const employeeName : string = await employeeValidator.certifyIfEmployeeWorksHere(employeeId, companyId);
    await cardValidator.checkIfUserHaveThisCard(cardType, employeeId);
    return employeeName;
};

export async function createNewCard (employeeName:string, employeeId:number, cardType: BusinessesType){
    const card = generateCreditCardInfo(employeeName, cardType, employeeId);
    const {cardId} = await cardRepository.insert(card.databaseCard)
    return { cardId, ...card.cardPreview}
};

export async function CardValidation (cardId:number, method: | "block" | "unblock" | "activate" | "default", securityCode?: string,){
    const card : Card = await cardValidator.checkIfCardExists(cardId);
    await cardValidator.checkCardValidation(card.expirationDate);
    await cardValidator.checkIfCardIsActive(card, method);
    await cardValidator.checkCardStatus(card, method!);

    if(method === "activate") await cardValidator.checkCardCVC(securityCode!, card);
    return card
};

export async function insertPassword(password : string, cardId: number){
    const encryptedPassword  =  encryptUtilts.hashDataBcrypt(password);
    await cardRepository.update(cardId, {password: encryptedPassword});
};

export async function changeCardStatus(cardId: number, password: string, card: Card, method: boolean){
    await cardValidator.checkPassword(card, password);
    await cardRepository.update(cardId, {isBlocked: method})
}

export async function insertAmount (cardId: number, value: number){
    const amount = await rechargeRepository.insert({cardId: cardId, amount: value});
    return amount;
}

export async function checkBalance (cardId: number){
    const receipt = await cardRepository.receipt(cardId);
    return receipt
}
