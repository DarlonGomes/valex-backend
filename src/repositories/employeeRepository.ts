import { connection } from "../../src/database/database";
import { Employee } from "../interfaces/employeeInterface";

export async function findById(id: number) {
  const result = await connection.query<Employee, [number]>(
    "SELECT * FROM employees WHERE id=$1",
    [id]
  );

  return result.rows[0];
}
