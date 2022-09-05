import {Request, Response} from "express";
import { CardBalance } from "../interfaces/cardInterface";
import * as cardService from "../services/cardService";

export async function getStatement (req: Request<CardBalance, {}, {}>, res: Response){
    const cardId: number = Number( req.params.cardId ) 
    await cardService.CardValidation(cardId!, "default");
    const receipt = await cardService.checkBalance(cardId);
    return res.status(200).send(receipt)
}