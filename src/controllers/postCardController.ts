import { Request, Response } from "express";
import { CardRequest } from "../interfaces/cardInterface";
import * as cardService from "../services/cardService";


export async function createCard (req: Request<{},{}, CardRequest>, res:Response){
    const {API_KEY} = res.locals;
    const { employeeId, cardType } = req.body;
    const employeeName = await cardService.createCardValidation(API_KEY, employeeId, cardType)
    const card = await cardService.createNewCard(employeeName, employeeId, cardType);
    return res.status(201).send(card);
}

export function rechargeCard (req: Request, res:Response){
    
}
