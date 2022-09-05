import * as businessValidator from "../handlers/businessValidator";
import * as cardValidator from "../handlers/cardValidator";
import * as paymentRepository from "../repositories/paymentRepository";
import { Card } from "../interfaces/cardInterface";


export async function validateBusiness (businessId: number, cardType: string){
    const business = await businessValidator.checkPartnerBusiness(businessId);
    await businessValidator.checkType(business.type, cardType);
}

export async function validatePurchase (cardPassword: string, card: Card, value: number){
    await cardValidator.checkPassword(card, cardPassword);
    await cardValidator.checkCardBalance(card.id, value);
}

export async function insertPayment( cardId: number, businessId: number, amount: number){
    await paymentRepository.insert({cardId, businessId, amount});
}