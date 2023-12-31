import { AffidavitModel } from "../AffidavitModel/affidavit-model";
import { BCTranslateModel } from "../BCTranslateModel/bctranslate-model";
import { DCTranslateModel } from "../DCTranslateModel/dctranslate-model";
import { DeedModel } from "../DeedModel/deed-model";
import { MCTranslateModel } from "../MCTranslateModel/mctranslate-model";
import { OtherDocumentTranslateModel } from "../OtherDocumentTranslateModel/other-document-translate-model";
import { PassporTranslateModel } from "../PassportTranslateModel/passpor-translate-model";
import { SchoolLeavingCertificateModel } from "../SchoolLeavingCertificateModel/school-leaving-certificate-model";
import { NICTranslator } from "../TranslatorModel/nictranslator";

export class DocumentAppend {
    token!: any;
    flag!: any;
    serviceId!: number;
    translationTitle!: string;
    nicTranslateModel!: NICTranslator;
    bcTranslateModel!: BCTranslateModel;
    passportTranslateModel!: PassporTranslateModel;
    mcTranslateModel!: MCTranslateModel;
    dcTranslateModel!: DCTranslateModel;
    otherDocumentModel!: OtherDocumentTranslateModel;
    schoolLeavingCertificateModel!: SchoolLeavingCertificateModel;
    affidavitModel!: AffidavitModel;
    deedModel!: DeedModel;
    submitedDate!: Date;
    pages!: number;
}
