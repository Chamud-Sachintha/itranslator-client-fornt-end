import { NotaryServiceFirstStep } from "../NotaryServiceFirstStep/notary-service-first-step";

export class NotaryServiceSecondStep {
    firstDocList: any[] = [];
    secondDoc: any[] = [];
    thirdDoc: any[] = [];
    dateOfSigning!: Date;
    startDate!: Date;
    endDate!: Date;
    value!: string;
    monthlyRent!: string;
    advanceAmount!: string;
    VODNumber!: string;
    ds!: string;
    localGov!: string;
    district!: string;
    lro!: string;
    firstStepData!: NotaryServiceFirstStep;
}
