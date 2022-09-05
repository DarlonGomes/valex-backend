import { Router } from "express";
import * as postController from "../controllers/postCardController";
import * as patchController from "../controllers/patchCardController"
import { headerValidation } from "../middlewares/headerMiddleware"
import { schemaValidation } from "../middlewares/joiMiddleware";

export const cardRoute = Router();

cardRoute.post("/cards/create", headerValidation, postController.createCard);
cardRoute.post("/cards/recharge");

cardRoute.get("/cards/statement");

cardRoute.patch("/cards/activate", schemaValidation.activateCard,  patchController.activateCard);
cardRoute.patch("/cards/block");
cardRoute.patch("/cards/unblock");