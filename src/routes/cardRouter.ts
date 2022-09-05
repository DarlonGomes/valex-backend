import { Router } from "express";
import * as postController from "../controllers/postCardController";
import * as patchController from "../controllers/patchCardController"
import { headerValidation } from "../middlewares/headerMiddleware"
import { schemaValidation } from "../middlewares/joiMiddleware";

export const cardRoute = Router();

cardRoute.post("/create", headerValidation, postController.createCard);
cardRoute.post("/recharge", schemaValidation.checkValue, postController.rechargeCard);

cardRoute.get("/statement");

cardRoute.patch("/activate", schemaValidation.activateCard,  patchController.activateCard);
cardRoute.patch("/block" ,schemaValidation.changeStatus, patchController.blockCard);
cardRoute.patch("/unblock", schemaValidation.changeStatus, patchController.unblockCard);