import Cryptr from "cryptr";
import bcrypt from "bcrypt";

export interface EncryptInterface { 
    encryptData: (data: string) => string;
    decryptData: (data: string) => string;
    hashDataBcrypt: (data: string) => string;
    validateBcryptData: (data: string, hashData: string) => boolean;
}

const cryptr = new Cryptr(process.env.CRYPTR_SECRET!);

export const encryptUtilts : EncryptInterface = { 
    encryptData : (data) => {
        return cryptr.encrypt(data);
    },
    decryptData : (data) => {
        return cryptr.decrypt(data);
    },
    hashDataBcrypt: (data) => {
        return bcrypt.hashSync(data, 10);
    },
    validateBcryptData: (data, hashData) =>{
        return bcrypt.compareSync(data, hashData);
    }
}

