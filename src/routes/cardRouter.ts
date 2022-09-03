import { Router } from "express";

export const cardRoute = Router();

cardRoute.post("/cards/create");
cardRoute.post("/cards/recharge");

cardRoute.get("/cards/statement");

cardRoute.patch("cards/activate");
cardRoute.patch("cards/block");
cardRoute.patch("cards/unblock");