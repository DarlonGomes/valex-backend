import { randCreditCardCVV, randCreditCardNumber  } from '@ngneat/falso';
import { encryptUtilts } from './cryptUtils';
import dayjs from 'dayjs';
import { BusinessesType } from '../interfaces/cardInterface';

export function generateCreditCardInfo (employeeName: string, cardType: BusinessesType, employeeId: number){

    const [creditCardCVC] = randCreditCardCVV({ length: 3 });
    const [number] = randCreditCardNumber({length: 16});
    const cardholderName = shortenHolderName(employeeName);
    const securityCode = encryptUtilts.encryptData(creditCardCVC);
    const expirationDate = dayjs().add(5,"y").format("MM/YY");
    const type  = cardType;
    const isBlocked = true;
    const isVirtual = false;

    return {
        databaseCard: { 
        employeeId,
        number,
        cardholderName,
        securityCode,
        expirationDate,
        isVirtual,
        isBlocked,
        type},
        cardPreview:{
            number,
            cardholderName,
            creditCardCVC,
            expirationDate
        }
    }
}

function shortenHolderName (name : string) : string {
    const nameArr = name.toUpperCase().split(" ");
    let result = ""
    for(let i = 0; i < nameArr.length; i ++){
        if(i === 0){
            result += nameArr[i] + " ";
            continue;
        }
        if(i === nameArr.length - 1){
            result += nameArr[i];
            continue;
        }
        if(
            nameArr[i] !== "DE" &&
            nameArr[i] !== "DA" && 
            nameArr[i] !== "DO" &&
            nameArr[i] !== "DAS" &&
            nameArr[i] !== "DOS" &&
            nameArr[i] !== "DI" &&
            nameArr[i] !== "DU" &&
            nameArr[i] !== "E" 
        ){  
            result += nameArr[i][0] + " "
        }
        
    }

    return result
} 
