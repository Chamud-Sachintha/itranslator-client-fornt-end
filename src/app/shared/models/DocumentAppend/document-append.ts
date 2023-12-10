import { BCTranslateModel } from "../BCTranslateModel/bctranslate-model";
import { DCTranslateModel } from "../DCTranslateModel/dctranslate-model";
import { MCTranslateModel } from "../MCTranslateModel/mctranslate-model";
import { PassporTranslateModel } from "../PassportTranslateModel/passpor-translate-model";
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
    submitedDate!: Date;
    pages!: number;
}
