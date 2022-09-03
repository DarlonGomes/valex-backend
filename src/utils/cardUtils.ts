import { randCreditCardCVV, randCreditCardNumber  } from '@ngneat/falso';

export function generateCreditCardInfo (employeeName: string){

    const creditCardCVC = randCreditCardCVV({ length: 3 });
    const creditCardNumber = randCreditCardNumber({length: 16});
    const cardHolderName = fullNameMinify(employeeName)
}

function fullNameMinify(name : string){
    const nameArr = name.toUpperCase().split(" ");
    const result = nameArr.filter()
}