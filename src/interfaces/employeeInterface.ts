export interface Employee {
    id: number;
    fullName: string;
    cpf: string;
    email: string;
    companyId: number;
}

export interface ActivateEmployeeCard {
  number: number;
  cardholderName: string;
  creditCardCVC: string;
  expirationDate: string;
}