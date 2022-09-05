import { connection } from "../../src/database/database";
import { Recharge, RechargeInsertData } from "../interfaces/rechargeInterface";

export async function findByCardId(cardId: number) {
  const result = await connection.query<Recharge, [number]>(
    `SELECT * FROM recharges WHERE "cardId"=$1`,
    [cardId]
  );

  return result.rows;
}

export async function insert(rechargeData: RechargeInsertData) {
  const { cardId, amount } = rechargeData;

  const {rows: [value]} = await connection.query<any, [number, number]>(
    `INSERT INTO recharges ("cardId", amount)
     VALUES ($1, $2)
     RETURNING amount `,
    [cardId, amount]
  );

  return value;
}
