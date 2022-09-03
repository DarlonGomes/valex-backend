

export type TransactionTypes =
| "groceries"
| "restaurant"
| "transport"
| "education"
| "health";

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
    type: TransactionTypes;
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
    type: TransactionTypes;
  }

  export type CardUpdateData = Partial<Card>;