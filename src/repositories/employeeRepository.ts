import { connection } from "../../src/database/database.js";
import { Employee } from "../interfaces/employeeInterface.js";

export async function findById(id: number) {
  const result = await connection.query<Employee, [number]>(
    "SELECT * FROM employees WHERE id=$1",
    [id]
  );

  return result.rows[0];
}
