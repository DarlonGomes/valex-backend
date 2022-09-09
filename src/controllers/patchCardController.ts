import { Request, Response } from "express";
import { CardStatus, CardUpdateData,  } from "../interfaces/cardInterface";
import * as cardService from "../services/cardService";

export async function activateCard (req: Request<{},{}, CardUpdateData>, res: Response){
    const { cardId, securityCode, password} = req.body;
    await cardService.CardValidation(cardId!, "activate", securityCode!);
    await cardService.insertPassword(password!, cardId!);
    return res.status(204).send("Successfull. Your card is active")
}

export async function blockCard ( req: Request <{},{}, CardStatus>, res: Response){
    const { cardId, password} = req.body;
    const card = await cardService.CardValidation(cardId!, "block");
    await cardService.changeCardStatus(cardId!, password!, card, true);
    return res.status(204).send("Successfull. Your card is now blocked")
}

export async function unlockCard ( req: Request <{},{}, CardStatus>, res: Response){
    const { cardId, password} = req.body;
    const card = await cardService.CardValidation(cardId!, "unlock");
    await cardService.changeCardStatus(cardId!, password!, card, false);
    return res.status(204).send("Successfull. Your card is now unlocked")
}