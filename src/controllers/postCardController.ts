import { Request, Response } from "express";
import { CardRequest } from "../interfaces/cardInterface.js";
import * as cardService from "../services/cardService.js";


export async function createCard (req: Request<{},{}, CardRequest>, res:Response){
    const {API_KEY} = res.locals;
    const { employeeId, cardType } = req.body;
    const card = await cardService.createNewCard(API_KEY, employeeId, cardType);
    return res.status(201).send(card);
}

export function rechargeCard (req: Request, res:Response){
    
}
