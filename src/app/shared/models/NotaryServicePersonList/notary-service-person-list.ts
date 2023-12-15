import { NotaryServiceFirstStep } from "../NotaryServiceFirstStep/notary-service-first-step";
import { NotaryServicePerson } from "../NotaryServicePerson/notary-service-person";
import { NotaryServiceSecondStep } from "../NotaryServiceSecondStep/notary-service-second-step";

export class NotaryServicePersonList {
    token!: any;
    flag!: any;
    secondStepData!: NotaryServiceSecondStep; // first step data already in second step data model
    notaryPerson: NotaryServicePerson[] = [];
}
