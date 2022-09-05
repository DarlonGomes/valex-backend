import { Router } from "express";
import * as postController from "../controllers/postCardController";
import * as patchController from "../controllers/patchCardController"
import { headerValidation } from "../middlewares/headerMiddleware"
import { schemaValidation } from "../middlewares/joiMiddleware";

export const cardRoute = Router();

cardRoute.post("/cards/create", headerValidation, postController.createCard);
cardRoute.post("/cards/recharge", schemaValidation.checkValue);

cardRoute.get("/cards/statement");

cardRoute.patch("/cards/activate", schemaValidation.activateCard,  patchController.activateCard);
cardRoute.patch("/cards/block" ,schemaValidation.changeStatus, patchController.blockCard);
cardRoute.patch("/cards/unblock", schemaValidation.changeStatus, patchController.unblockCard);