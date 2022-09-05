import { Router } from "express";
import { schemaValidation } from "../middlewares/joiMiddleware";
import * as purchaseController from "../controllers/purchaseController";

export const purchaseRoute = Router();

purchaseRoute.post("/pos", schemaValidation.physicalPurchase, purchaseController.posPurchase);