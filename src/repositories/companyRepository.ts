import { connection } from "../../src/database/database.js";
import { Company } from "../interfaces/companyInterface.js";

export async function findByApiKey(apiKey: string) {
  const result = await connection.query<Company, [string]>(
    `SELECT * FROM companies WHERE "apiKey"=$1`,
    [apiKey]
  );

  return result.rows[0];
}
