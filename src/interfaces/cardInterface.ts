import { number, string } from "joi";


export type BusinessesType =
| "groceries"
| "restaurant"
| "transport"
| "education"
| "health";

export interface CardRequest  {
  cardType : BusinessesType;
  employeeId : number
}

export type CardInfo = {
cardNumber: string;
cardholderName: string;
expirationDate: string;
CVC: string;
};

export interface CardInsertData {
  employeeId: number;
  number: string;
  cardholderName: string;
  securityCode: string;
  expirationDate: string;
  password?: string;
  isVirtual: boolean;
  originalCardId?: number;
  isBlocked: boolean;
  type: BusinessesType;
}
  
  export interface Card extends CardInsertData {
    id: number;
  }
  
  export interface CardResponse {
    cardId: number;
    number: string;
    cardholderName: string;
    securityCode: string;
    expirationDate: string;
    type: BusinessesType;
  }

  export type CardUpdateData = Partial<Card>;

  export type CardBalance = Partial<CardResponse>;

  export interface CardStatus {
    cardId: number;
    password: string
  }