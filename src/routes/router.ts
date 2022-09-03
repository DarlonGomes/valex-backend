import { Router } from "express";
import { cardRoute } from "./cardRouter";
import { purchaseRoute } from "./purchaseRoute";

export const router = Router();

router.use(cardRoute);
router.use(purchaseRoute);