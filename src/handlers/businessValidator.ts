import * as businessRepository from "../repositories/businessRepository";
import { ErrorInfo } from "../middlewares/errorMiddleware";

export async function checkPartnerBusiness (businessId: number){
    const business = await businessRepository.findById(businessId);
    if(!business) throw new ErrorInfo("error_not_found", "This business isn't a partner of our service");
    return business;
}

export async function checkType (businessType: string, cardType: string){
    if(businessType !== cardType) throw new ErrorInfo ("error_conflict", "This business doesn't accept this type of card");
    
}