import { Request, Response } from "express";
import * as cardRepository from "../repositories/cardRepository.js";
import * as companyValidator from "../handlers/companyValidator.js";
import * as employeeValidator from "../handlers/employeeValidator.js";
import * as cardValidator from "../handlers/cardValidator.js";
import { BusinessesType } from "../interfaces/cardInterface.js";

export async function createNewCard (key:string, employeeId:number, cardType: BusinessesType){
    const companyId = await companyValidator.KeyValidation(key);
    const employeeName = await employeeValidator.certifyIfEmployeeWorksHere(employeeId, companyId);
    await cardValidator.checkIfUserHaveThisCard(cardType, employeeId);
    


}