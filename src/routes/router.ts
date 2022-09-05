import { Router } from "express";
import { cardRoute } from "./cardRouter";
import { purchaseRoute } from "./purchaseRoute";

export const router = Router();

router.use("/cards", cardRoute);
router.use(purchaseRoute);