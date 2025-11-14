namespace ust.arfaath.shaik.db;
using { cuid } from '@sap/cds/common';
using { ust.arfaath.shaik.reuse as reuse} from './commons';
using { Currency } from '@sap/cds/common';


entity Employees: cuid {
    nameFirst : String(40);
    nameMiddle : String(40);
    nameLast : String(40);
    nameInitials : String(40);
    sex : reuse.Gender;
    language : String(1);
    phoneNumber : reuse.PhoneNumber;
    email : reuse.Email;
    loginName : String(12);
    CURRENCY_CODE : Currency;
    salaryAmount : Decimal(10,2);
    accountNumber : String(16);
    bankId : String(8);
    bankName : String(64);
}

