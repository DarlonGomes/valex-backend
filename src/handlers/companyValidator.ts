import { ErrorInfo } from "../middlewares/errorMiddleware.js";
import * as companyRepository from "../repositories/companyRepository.js";

export async function KeyValidation (key : string){
    const company = await companyRepository.findByApiKey(key);
    if(!company) throw new ErrorInfo ("error_not_found", "Company not found");
    return company.id 
}
