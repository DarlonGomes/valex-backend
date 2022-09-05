import { Router } from "express";
import { schemaValidation } from "../middlewares/joiMiddleware";

export const purchaseRoute = Router();

purchaseRoute.post("/purchase", schemaValidation.checkValue)