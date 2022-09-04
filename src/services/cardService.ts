import { Request, Response } from "express";
import * as cardRepository from "../repositories/cardRepository";
import * as companyValidator from "../handlers/companyValidator";
import * as employeeValidator from "../handlers/employeeValidator";
import * as cardValidator from "../handlers/cardValidator";
import { BusinessesType} from "../interfaces/cardInterface";
import { generateCreditCardInfo } from "../utils/cardUtils";


export async function createCardValidation (key:string, employeeId:number, cardType: BusinessesType){
    const companyId = await companyValidator.KeyValidation(key);
    const employeeName = await employeeValidator.certifyIfEmployeeWorksHere(employeeId, companyId);
    await cardValidator.checkIfUserHaveThisCard(cardType, employeeId);
    return employeeName;
};

export async function createNewCard (employeeName:string, employeeId:number, cardType: BusinessesType){
    const card = generateCreditCardInfo(employeeName, cardType, employeeId);
    await cardRepository.insert(card.databaseCard)
    return card.cardPreview
};

export async function activateCardValidation (){

};