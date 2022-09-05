export interface Payment {
  id: number;
  cardId: number;
  businessId: number;
  timestamp: Date;
  amount: number;
}

export type PaymentWithBusinessName = Payment & { businessName: string };
export type PaymentInsertData = Omit<Payment, "id" | "timestamp">;
  
export interface Exchange {
  id: number;
  value: number;
}

export interface PhysicalPurchase {
  cardId: number;
  businessId: number;
  cardPassword: string;
  value: number
}