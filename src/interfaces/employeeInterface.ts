export interface Employee {
    id: number;
    fullName: string;
    cpf: string;
    email: string;
    companyId: number;
}

export interface ActivateEmployeeCard {
  number: string;
  cardholderName: string;
  creditCardCVC: string;
  expirationDate: string;
  password: string;
}