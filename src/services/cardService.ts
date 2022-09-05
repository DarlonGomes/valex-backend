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
    await cardRepository.insert(card.databaseCard)
    return card.cardPreview
};

export async function activateCardValidation (number: string, cardholderName: string, creditCardCVC: string, expirationDate: string){
    const card : Card = await cardValidator.checkIfCardExists(number, cardholderName, expirationDate);
    await cardValidator.checkCardValidation(expirationDate);
    await cardValidator.checkIfCardIsActive(card);
    await cardValidator.checkCardCVC(creditCardCVC, card);
    return card?.id
};

export async function insertPassword(password : string, cardId: number){
    const encryptedPassword  =  encryptUtilts.hashDataBcrypt(password);
    await cardRepository.update(cardId, {password: encryptedPassword});
};