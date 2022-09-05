import { Router } from "express";
import { schemaValidation } from "../middlewares/joiMiddleware";
import * as purchaseController from "../controllers/purchaseController";

export const purchaseRoute = Router();

purchaseRoute.post("/purchases/pos", schemaValidation.checkValue, purchaseController.posPurchase);