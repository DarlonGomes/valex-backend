import * as cardRepository from "../repositories/cardRepository";
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

export async function CardValidation (id:number, method: | "block" | "unblock" | "activate", securityCode?: string,){
    const card : Card = await cardValidator.checkIfCardExists(id);
    await cardValidator.checkCardValidation(card.expirationDate);
    await cardValidator.checkIfCardIsActive(card, method);
    await cardValidator.checkCardStatus(card, method);
    
    if(method === "activate") await cardValidator.checkCardCVC(securityCode!, card);
    
};

export async function insertPassword(password : string, id: number){
    const encryptedPassword  =  encryptUtilts.hashDataBcrypt(password);
    await cardRepository.update(id, {password: encryptedPassword});
};

export async function changeCardStatus(id: number, method: "block" | "unblock"){

}