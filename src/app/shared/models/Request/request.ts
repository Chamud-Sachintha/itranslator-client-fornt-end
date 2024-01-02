import { NotaryServicePerson } from "../NotaryServicePerson/notary-service-person";
import { NotaryServicePersonList } from "../NotaryServicePersonList/notary-service-person-list";

export class Request {
    token!: any;
    flag!: any;
    mainNotaryCategory!: string;
    subNotaryCategory!: string;
    serviceDescription!: string;
    invoiceNo!: string;
    firstDoc: any[] = [];
    secondDoc: any[] = [];
    thirdDoc: any[] = [];
    dateOfSigning!: Date;
    startDate!: Date;
    endDate!: Date;
    value!: string;
    monthlyRent!: string;
    advanceAmt!: string;
    vodNumber!: string;
    ds!: string;
    lg!: string;
    district!: string;
    lro!: string;
    notaryServicePersonList: NotaryServicePerson[] = [];
    reference!: any;
    message!: string;
}
