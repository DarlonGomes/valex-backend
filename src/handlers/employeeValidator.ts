import { ErrorInfo } from "../middlewares/errorMiddleware.js";
import * as employeeRepository from "../repositories/employeeRepository.js";

export async function certifyIfEmployeeWorksHere(id: number, company: number){
    const employee = await employeeRepository.findById(id);
    if(!employee) throw new ErrorInfo("error_not_found", "Employee not found");
    if(employee.companyId !== company) throw new ErrorInfo("error_conflict", "Employee doesn't work in this company");
    return employee.fullName
}