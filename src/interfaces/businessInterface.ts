import { TransactionTypes } from "./cardInterface";

export interface Business {
    id: number;
    name: string;
    type: TransactionTypes;
  }