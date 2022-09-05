import { Request, Response } from "express"
import { PhysicalPurchase } from "../interfaces/paymentInterface"
import * as cardService from "../services/cardService";
import * as businessService from "../services/businessService";

export async function posPurchase (req: Request < {}, {}, PhysicalPurchase>, res: Response){
    const { cardId, businessId, cardPassword, value } = req.body;
    const card = await cardService.CardValidation(cardId, "default");
    await businessService.validateBusiness(businessId, card.type);
    await businessService.validatePurchase(cardPassword, card, value);
    await businessService.insertPayment(cardId, businessId, value)
    return res.status(201).send(`Sucessfull. Was charged $${value * 0.01}`);
}