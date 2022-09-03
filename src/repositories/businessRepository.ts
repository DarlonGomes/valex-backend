import { connection } from "../../src/database/database.js";
import { Business } from "../interfaces/businessInterface.js";

export async function findById(id: number) {
  const result = await connection.query<Business, [number]>(
    "SELECT * FROM businesses WHERE id=$1",
    [id]
  );

  return result.rows[0];
}
