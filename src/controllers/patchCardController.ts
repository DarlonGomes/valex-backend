import { Request, Response } from "express";
import { CardUpdateData } from "../interfaces/cardInterface";
import * as cardService from "../services/cardService";

export async function activateCard (req: Request<{},{}, CardUpdateData>, res: Response){
    const { id, securityCode, password} = req.body;
    await cardService.CardValidation(id!, "activate", securityCode!);
    await cardService.insertPassword(password!, id!);
    return res.status(204).send("Successfull. Your card is active")
}

export async function blockCard ( req: Request <{},{}, CardUpdateData>, res: Response){
    const { id, password} = req.body;
    await cardService.CardValidation(id!, "block");
    return res.status(204).send("Successfull. Your card is now blocked")
}

export async function unblockCard ( req: Request <{},{}, CardUpdateData>, res: Response){
    const { id, password} = req.body;
    await cardService.CardValidation(id!, "unblock");
    return res.status(204).send("Successfull. Your card is now unblocked")
}