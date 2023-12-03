import { BCTranslateModel } from "../BCTranslateModel/bctranslate-model";
import { PassporTranslateModel } from "../PassportTranslateModel/passpor-translate-model";
import { NICTranslator } from "../TranslatorModel/nictranslator";

export class DocumentAppend {
    token!: any;
    flag!: any;
    translationTitle!: string;
    nicTranslateModel!: NICTranslator;
    bcTranslateModel!: BCTranslateModel;
    passportTranslateModel!: PassporTranslateModel;
    submitedDate!: Date;
}
