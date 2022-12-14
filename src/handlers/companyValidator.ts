import { ErrorInfo } from "../middlewares/errorMiddleware";
import * as companyRepository from "../repositories/companyRepository";

export async function KeyValidation (key : string){
    const company = await companyRepository.findByApiKey(key);
    if(!company) throw new ErrorInfo ("error_not_found", "Company not found");
    return company.id 
}
