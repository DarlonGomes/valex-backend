import { Request, Response } from "express";
import { ActivateEmployeeCard } from "../interfaces/employeeInterface";
import * as cardService from "../services/cardService";

export async function activateCard (req: Request<{},{}, ActivateEmployeeCard>, res: Response){
    const { number, cardholderName, creditCardCVC, expirationDate, password} = req.body;
    const cardId = await cardService.activateCardValidation(number, cardholderName, creditCardCVC, expirationDate);
    await cardService.insertPassword(password, cardId);
    return res.status(204).send("Successfull. Your card is active")
}