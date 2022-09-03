export interface Recharge {
    id: number;
    cardId: number;
    timestamp: Date;
    amount: number;
  }
  export type RechargeInsertData = Omit<Recharge, "id" | "timestamp">;
  