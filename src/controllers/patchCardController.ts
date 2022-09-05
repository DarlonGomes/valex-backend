import { Request, Response } from "express";
import { CardUpdateData,  } from "../interfaces/cardInterface";
import * as cardService from "../services/cardService";

export async function activateCard (req: Request<{},{}, CardUpdateData>, res: Response){
    const { employeeId, securityCode, password} = req.body;
    await cardService.CardValidation(employeeId!, "activate", securityCode!);
    await cardService.insertPassword(password!, employeeId!);
    return res.status(204).send("Successfull. Your card is active")
}

export async function blockCard ( req: Request <{},{}, CardUpdateData>, res: Response){
    const { id, password} = req.body;
    const card = await cardService.CardValidation(id!, "block");
    await cardService.changeCardStatus(id!, password!, card, true);
    return res.status(204).send("Successfull. Your card is now blocked")
}

export async function unblockCard ( req: Request <{},{}, CardUpdateData>, res: Response){
    const { id, password} = req.body;
    const card = await cardService.CardValidation(id!, "unblock");
    await cardService.changeCardStatus(id!, password!, card, false);
    return res.status(204).send("Successfull. Your card is now unblocked")
}