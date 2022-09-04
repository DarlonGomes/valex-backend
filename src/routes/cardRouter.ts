import { Router } from "express";
import * as postController from "../controllers/postCardController";
import {headerValidation} from "../middlewares/headerMiddleware"
export const cardRoute = Router();

cardRoute.post("/cards/create", headerValidation, postController.createCard);
cardRoute.post("/cards/recharge");

cardRoute.get("/cards/statement");

cardRoute.patch("cards/activate");
cardRoute.patch("cards/block");
cardRoute.patch("cards/unblock");