import { DatePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataShareService } from 'src/app/services/data/data-share.service';
import { ServiceService } from 'src/app/services/service/service.service';
import { AffidavitModel } from 'src/app/shared/models/AffidavitModel/affidavit-model';
import { BCTranslateModel } from 'src/app/shared/models/BCTranslateModel/bctranslate-model';
import { DCTranslateModel } from 'src/app/shared/models/DCTranslateModel/dctranslate-model';
import { DeedModel } from 'src/app/shared/models/DeedModel/deed-model';
import { DocumentAppend } from 'src/app/shared/models/DocumentAppend/document-append';
import { MCTranslateModel } from 'src/app/shared/models/MCTranslateModel/mctranslate-model';
import { OtherDocumentTranslateModel } from 'src/app/shared/models/OtherDocumentTranslateModel/other-document-translate-model';
import { PassporTranslateModel } from 'src/app/shared/models/PassportTranslateModel/passpor-translate-model';
import { SchoolLeavingCertificateModel } from 'src/app/shared/models/SchoolLeavingCertificateModel/school-leaving-certificate-model';
import { SearchParam } from 'src/app/shared/models/SearchParam/search-param';
import { NICTranslator } from 'src/app/shared/models/TranslatorModel/nictranslator';

@Component({
  selector: 'app-upload-required-docs',
  templateUrl: './upload-required-docs.component.html',
  styleUrls: ['./upload-required-docs.component.css'],
  providers: [DatePipe]
})
export class UploadRequiredDocsComponent implements OnInit {

  selectedServiceList: any[] = [];
  nicTranslateForm!: FormGroup;
  bcTranslateForm!: FormGroup;
  passportTranslateForm!: FormGroup;
  marriageTranslateForm!: FormGroup;
  deathTranslateForm!: FormGroup;
  schoolLeavingTranslateForm!: FormGroup;
  additionalInfoForm!: FormGroup;
  otherDocumentTranslateForm!: FormGroup;
  affidavitForm!: FormGroup;
  deedForm!: FormGroup;
  nicTranslateService = false;
  birthCertificateTranslateService = false;
  passportTranslateService = false;
  marriageTranslateService = false;
  deathTranslateService = false;
  schoolLeaveTranslateService = false;
  otherDocumentTranslateService = false;
  affidavitTranslateionService = false;
  deedTranslationService = false;
  nicTranslatorModel = new NICTranslator();
  bcTranslateModel = new BCTranslateModel();
  mcTranslateModel = new MCTranslateModel();
  passportTranslateModel = new PassporTranslateModel();
  dcTranslateModel = new DCTranslateModel();
  documentAppendModel = new DocumentAppend();
  otherDocumentTranslateModel = new OtherDocumentTranslateModel();
  schoolLeavingCertificateNModel = new SchoolLeavingCertificateModel();
  affidavitModel = new AffidavitModel();
  deedModel = new DeedModel();
  appendDocList: DocumentAppend[] = [];
  searchParamModel = new SearchParam();
  deliveryTime!: string;
  deliveryMethod!: string;
  paymentMethod!: string;
  bankSlip!: File;
  serviceId!: number;

  constructor(private router: Router, private dataShareService: DataShareService, private location: Location
            , private fromBuilder: FormBuilder
            , private serviceService: ServiceService) {
  }

  ngOnInit() {
    this.dataShareService.getComponentValueObj().subscribe((data) => {
      this.selectedServiceList.push(data);
    })

    this.initNicTranslateForm();
    this.bcTranslateFormInit();
    this.passportTranslateFormInit();
    this.marriageTranslateFormInit();
    this.deathCertificateTranslateFormInit();
    this.initOtherDocumenTranslateForm();
    this.initSchoolLeavingCertificateForm();
    this.initAffidavitForm();
    this.initDeedForm();
  }

  onSubmitDeedForm() {

    const fullName = this.deedForm.controls['fullName'].value;
    const address = this.deedForm.controls['address'].value;
    const page1 = this.deedForm.controls['page1'].value;
    const page2 = this.deedForm.controls['page2'].value;
    const page3 = this.deedForm.controls['page3'].value;
    const page4 = this.deedForm.controls['page4'].value;
    const page5 = this.deedForm.controls['page5'].value;
    const page6 = this.deedForm.controls['page6'].value;

    if (fullName == "") {

    } else if (address == "") {

    } else if (page1 == "" && page2 == "" && page3 == "" && page4 == "" && page5 == "" && page6 == "") {

    } else {

      let pageCount = 0;

      this.deedModel.fullName = fullName;
      this.deedModel.address = address;
      
      if (page1 != "") {
        this.convertImageToBase64(page1).then((base64String) => {
          this.deedModel.page1 = base64String;
        })

        pageCount += 1;
      }

      if (page2 != "") {
        this.convertImageToBase64(page2).then((base64String) => {
          this.deedModel.page2= base64String;
        })

        pageCount += 1;
      }

      if (page3 != "") {
        this.convertImageToBase64(page3).then((base64String) => {
          this.deedModel.page3 = base64String;
        })

        pageCount += 1;
      }

      if (page4 != "") {
        this.convertImageToBase64(page4).then((base64String) => {
          this.deedModel.page4 = base64String;
        })

        pageCount += 1;
      }

      if (page5 != "") {
        this.convertImageToBase64(page5).then((base64String) => {
          this.deedModel.page5 = base64String;
        })

        pageCount += 1;
      }

      if (page6 != "") {
        this.convertImageToBase64(page6).then((base64String) => {
          this.deedModel.page6 = base64String;
        })

        pageCount += 1;
      }

      let deedAppend = new DocumentAppend();
      
      deedAppend.serviceId = this.serviceId;
      deedAppend.deedModel = this.deedModel;
      deedAppend.translationTitle = "Deed Translation Service";
      deedAppend.submitedDate = new Date();
      deedAppend.pages = pageCount;

      this.appendDocList.push(deedAppend);
    }
  }

  onChangeDeedPage1($event: any) {
    const file = ($event.target as any).files[0]; 
    this.deedForm.patchValue({"page1": file});
  }

  onChangeDeedPage2($event: any) {
    const file = ($event.target as any).files[0]; 
    this.deedForm.patchValue({"page2": file});
  }

  onChangeDeedPage3($event: any) {
    const file = ($event.target as any).files[0]; 
    this.deedForm.patchValue({"page3": file});
  }

  onChangeDeedPage4($event: any) {
    const file = ($event.target as any).files[0]; 
    this.deedForm.patchValue({"page4": file});
  }

  onChangeDeedPage5($event: any) {
    const file = ($event.target as any).files[0]; 
    this.deedForm.patchValue({"page5": file});
  }

  onChangeDeedPage6($event: any) {
    const file = ($event.target as any).files[0]; 
    this.deedForm.patchValue({"page6": file});
  }

  initDeedForm() {
    this.deedForm = this.fromBuilder.group({
      fullName: ['', Validators.required],
      address: ['', Validators.required],
      page1: ['', Validators.required],
      page2: ['', Validators.required],
      page3: ['', Validators.required],
      page4: ['', Validators.required],
      page5: ['', Validators.required],
      page6: ['', Validators.required]
    })
  }

  onSubmitAffidavitForm() {
    const fullName = this.affidavitForm.controls['fullName'].value;
    const address = this.affidavitForm.controls['address'].value;
    const descriptionOfService = this.affidavitForm.controls['descriptionOfService'].value;
    const page1 = this.affidavitForm.controls['page1'].value;
    const page2 = this.affidavitForm.controls['page2'].value;
    const page3 = this.affidavitForm.controls['page3'].value;
    const page4 = this.affidavitForm.controls['page4'].value;
    const page5 = this.affidavitForm.controls['page5'].value;

    if (fullName == "") {

    } else if (address == "") {

    } else if (descriptionOfService == "") {

    } else if (page1 == "" && page2 == "" && page3 == "" && page4 == "" && page5 == "") {

    } else {
      let pageCount = 0;
      this.affidavitModel.fullName = fullName;
      this.affidavitModel.address = address;
      this.affidavitModel.descriptionOfService = descriptionOfService;
      
      if (page1 != null) {
        this.convertImageToBase64(page1).then((base64String) => {
          this.affidavitModel.page1 = base64String;
        })

        pageCount += 1;
      }

      if (page2 != null) {
        this.convertImageToBase64(page2).then((base64String) => {
          this.affidavitModel.page2 = base64String;
        })

        pageCount += 1;
      }

      if (page3 != null) {
        this.convertImageToBase64(page3).then((base64String) => {
          this.affidavitModel.page3 = base64String;
        })

        pageCount += 1;
      }

      if (page4 != null) {
        this.convertImageToBase64(page4).then((base64String) => {
          this.affidavitModel.page4 = base64String;
        })

        pageCount += 1;
      }

      if (page5 != null) {
        this.convertImageToBase64(page5).then((base64String) => {
          this.affidavitModel.page5 = base64String;
        })

        pageCount += 1;
      }

      let affidavitModelAppend = new DocumentAppend();

      affidavitModelAppend.serviceId = this.serviceId;
      affidavitModelAppend.affidavitModel = this.affidavitModel;
      affidavitModelAppend.translationTitle = "Affidavit Translation Service";
      affidavitModelAppend.submitedDate = new Date();
      affidavitModelAppend.pages = pageCount;

      this.appendDocList.push(affidavitModelAppend);
    }
  }

  initAffidavitForm() {
    this.affidavitForm = this.fromBuilder.group({
      fullName: ['', Validators.required],
      address: ['', Validators.required],
      descriptionOfService: ['', Validators.required],
      page1: ['', Validators.required],
      page2: ['', Validators.required],
      page3: ['', Validators.required],
      page4: ['', Validators.required],
      page5: ['', Validators.required]
    })
  }

  onChangeAffidavirPage1($event: any) {
    const file = ($event.target as any).files[0]; 
    this.affidavitForm.patchValue({"page1": file});
  }

  onChangeAffidavirPage2($event: any) {
    const file = ($event.target as any).files[0]; 
    this.affidavitForm.patchValue({"page2": file});
  }

  onChangeAffidavirPage3($event: any) {
    const file = ($event.target as any).files[0]; 
    this.affidavitForm.patchValue({"page3": file});
  }

  onChangeAffidavirPage4($event: any) {
    const file = ($event.target as any).files[0]; 
    this.affidavitForm.patchValue({"page4": file});
  }

  onChangeAffidavirPage5($event: any) {
    const file = ($event.target as any).files[0]; 
    this.affidavitForm.patchValue({"page5": file});
  }

  onChangeSchoolLeavingCertificateFrontImage($event: any) {
    const file = ($event.target as any).files[0]; 
    this.schoolLeavingTranslateForm.patchValue({"frontImage": file});
  }

  onChangeSchoolLeavingCertificateBackImage($event: any) {
    const file = ($event.target as any).files[0]; 
    this.schoolLeavingTranslateForm.patchValue({"backImage": file});
  }

  onSubmitSchoolLeavingCertificateForm() {

    const fullName = this.schoolLeavingTranslateForm.controls['fullName'].value;
    const schoolName = this.schoolLeavingTranslateForm.controls['schoolName'].value;
    const frontImage = this.schoolLeavingTranslateForm.controls['frontImage'].value;
    const backImage = this.schoolLeavingTranslateForm.controls['backImage'].value;

    if (fullName == "") {

    } else if (schoolName == "") {

    } else if (frontImage == "") {

    } else if (backImage == "") {

    } else {
      this.schoolLeavingCertificateNModel.fullName = fullName;
      this.schoolLeavingCertificateNModel.schoolname = schoolName;
      
      this.convertImageToBase64(frontImage).then((base64String) => {
        this.schoolLeavingCertificateNModel.frontImage = base64String;
      })

      this.convertImageToBase64(backImage).then((base64String) => {
        this.schoolLeavingCertificateNModel.backImage = base64String;
      })

      let schoolLeavingCertificateAppend = new DocumentAppend();

      schoolLeavingCertificateAppend.serviceId = this.serviceId;
      schoolLeavingCertificateAppend.schoolLeavingCertificateModel = this.schoolLeavingCertificateNModel;
      schoolLeavingCertificateAppend.translationTitle = "School Leaving Certificate";
      schoolLeavingCertificateAppend.submitedDate = new Date();
      schoolLeavingCertificateAppend.pages = 2;

      this.appendDocList.push(schoolLeavingCertificateAppend);
    }
  }

  initSchoolLeavingCertificateForm() {
    this.schoolLeavingTranslateForm = this.fromBuilder.group({
      fullName: ['', Validators.required],
      schoolName: ['', Validators.required],
      frontImage: ['', Validators.required],
      backImage: ['', Validators.required]
    })
  }

  onChangeOtherDocPage1Change($event: any) {
    const file = ($event.target as any).files[0]; 
    this.otherDocumentTranslateForm.patchValue({"image1": file});
  }

  onChangeOtherDocPage2Change($event: any) {
    const file = ($event.target as any).files[0]; 
    this.otherDocumentTranslateForm.patchValue({"image2": file});
  }

  onChangeOtherDocPage3Change($event: any) {
    const file = ($event.target as any).files[0]; 
    this.otherDocumentTranslateForm.patchValue({"image3": file});
  }

  onChangeOtherDocPage4Change($event: any) {
    const file = ($event.target as any).files[0]; 
    this.otherDocumentTranslateForm.patchValue({"image4": file});
  }

  onChangeOtherDocPage5Change($event: any) {
    const file = ($event.target as any).files[0]; 
    this.otherDocumentTranslateForm.patchValue({"image5": file});
  }

  onChangeOtherDocPage6Change($event: any) {
    const file = ($event.target as any).files[0]; 
    this.otherDocumentTranslateForm.patchValue({"image6": file});
  }

  onSubmitOtherDocumentTranslateForm() {
    const fullName = this.otherDocumentTranslateForm.controls['fullName'].value;
    const fatherName = this.otherDocumentTranslateForm.controls['fatherName'].value;
    const motherName = this.otherDocumentTranslateForm.controls['motherName'].value;
    const page1 = this.otherDocumentTranslateForm.controls['image1'].value;
    const page2 = this.otherDocumentTranslateForm.controls['image2'].value;
    const page3 = this.otherDocumentTranslateForm.controls['image3'].value;
    const page4 = this.otherDocumentTranslateForm.controls['image4'].value;
    const page5 = this.otherDocumentTranslateForm.controls['image5'].value;
    const page6 = this.otherDocumentTranslateForm.controls['image6'].value;

    if (fullName == "") {

    } else if (fatherName == "") {

    } else if (motherName == "") {

    } else if (page1 == "" && page2 == "" && page3 == "" && page4 == "" && page5 == "" && page6 == "") {

    } else {
      let pageCount = 0;
      this.otherDocumentTranslateModel.fullName = fullName;
      this.otherDocumentTranslateModel.fatherName = fatherName;
      this.otherDocumentTranslateModel.motherName = motherName;
      
      if (page1 != "") {
        this.convertImageToBase64(page1).then((base64String) => {
          this.otherDocumentTranslateModel.page1 = base64String;
        })

        pageCount += 1;
      }

      if (page2 != "") {
        this.convertImageToBase64(page2).then((base64String) => {
          this.otherDocumentTranslateModel.page2 = base64String;
        })

        pageCount += 1;
      }

      if (page3 != "") {
        this.convertImageToBase64(page3).then((base64String) => {
          this.otherDocumentTranslateModel.page3 = base64String;
        })

        pageCount += 1;
      }

      if (page4 != "") {
        this.convertImageToBase64(page4).then((base64String) => {
          this.otherDocumentTranslateModel.page4 = base64String;
        })

        pageCount += 1;
      }

      if (page5 != "") {
        this.convertImageToBase64(page2).then((base64String) => {
          this.otherDocumentTranslateModel.page5 = base64String;
        })

        pageCount += 1;
      }

      if (page6 != "") {
        this.convertImageToBase64(page6).then((base64String) => {
          this.otherDocumentTranslateModel.page6 = base64String;
        })

        pageCount += 1;
      }

      this.otherDocumentTranslateModel.pages = pageCount;

      let otherDocumentAppend = new DocumentAppend();

      otherDocumentAppend.serviceId = this.serviceId;
      otherDocumentAppend.otherDocumentModel = this.otherDocumentTranslateModel;
      otherDocumentAppend.translationTitle = "Other Document";
      otherDocumentAppend.submitedDate = new Date();
      otherDocumentAppend.pages = pageCount;

      this.appendDocList.push(otherDocumentAppend);
    }
  }

  initOtherDocumenTranslateForm() {
    this.otherDocumentTranslateForm = this.fromBuilder.group({
      fullName: ['', Validators.required],
      fatherName: ['', Validators.required],
      motherName: ['', Validators.required],
      image1: ['', Validators.required],
      image2: ['', Validators.required],
      image3: ['', Validators.required],
      image4: ['', Validators.required],
      image5: ['', Validators.required],
      image6: ['', Validators.required],
    })
  }

  onChangeBankSlip(event: any) {
    const file = (event.target as any).files[0]; 
    this.bankSlip = file as File;
  }

  onChangeDeliveryTime() {

    this.searchParamModel.token = sessionStorage.getItem("authToken");
    this.searchParamModel.flag = sessionStorage.getItem("role");

    this.selectedServiceList[0].forEach((eachDoc: any) => {
      console.log(eachDoc.serviceId);
      this.searchParamModel.serviceId = eachDoc.serviceId;
      this.searchParamModel.deliveryTimeType = this.deliveryTime;

      this.serviceService.getServicePriceByDeliveryTime(this.searchParamModel).subscribe((resp: any) => {

        const priceInfo = JSON.parse(JSON.stringify(resp));

        if (resp.code === 1) {
          if (eachDoc.serviceId == 1) {
            this.nicTranslatorModel.price = priceInfo.data[0].servicePrice;
          } else if (eachDoc.serviceId == 2) {
            this.bcTranslateModel.price = priceInfo.data[0].servicePrice;
          } else if (eachDoc.serviceId == 5) {
            this.otherDocumentTranslateModel.price = priceInfo.data[0].servicePrice;
          }
        }
      })
    })
  }

  onSubmitDeathCertificateTranslateForm() {
    const name = this.deathTranslateForm.controls['name'].value;
    const fatherName = this.deathTranslateForm.controls['fatherName'].value;
    const motherName = this.deathTranslateForm.controls['motherName'].value;
    const frontImg = this.deathTranslateForm.controls['frontImg'].value;
    const backImg = this.deathTranslateForm.controls['backImg'].value;

    if (name == "") {

    } else if (fatherName == "") {

    } else if (motherName == "") {

    } else if (frontImg == "") {

    } else if (backImg == "") {

    } else {
      this.dcTranslateModel.name = name;
      this.dcTranslateModel.fatherName = fatherName;
      this.dcTranslateModel.motherName = motherName;
      
      this.convertImageToBase64(frontImg).then((base64String) => {
        this.dcTranslateModel.frontImg = base64String;
      })

      this.convertImageToBase64(backImg).then((base64String) => {
        this.dcTranslateModel.backImg = base64String;
      })

      let dcDocumentAppendModel = new DocumentAppend();

      dcDocumentAppendModel.serviceId = this.serviceId;
      dcDocumentAppendModel.dcTranslateModel = this.dcTranslateModel;
      dcDocumentAppendModel.translationTitle = "Death Certificate Translate Model";
      dcDocumentAppendModel.submitedDate = (new Date());
      dcDocumentAppendModel.pages = 2;

      this.appendDocList.push(dcDocumentAppendModel);
    }
  }

  deathCertificateTranslateFormInit() {
    this.deathTranslateForm = this.fromBuilder.group({
      name: ['', Validators.required],
      fatherName: ['', Validators.required],
      motherName: ['', Validators.required],
      frontImg: ['', Validators.required],
      backImg: ['', Validators.required]
    })
  }

  onClickNextStep() {
    
    const completeDocObj = {
      uploadedDocList: this.appendDocList,
      deliveryTime: this.deliveryTime,
      deliveryMethod: this.deliveryMethod,
      paymentMethod: this.paymentMethod,
      bankSlip: (this.paymentMethod == "1" ? this.convertImageToBase64(this.bankSlip) : null)
    }

    console.log(completeDocObj);

    this.dataShareService.setComponentValueObj(completeDocObj);
    this.router.navigate(['app/select-services/step-04']);
  }

  onSubmitMariageTranslateForm() {
    const maleName = this.marriageTranslateForm.controls['maleName'].value;
    const maleFatherName = this.marriageTranslateForm.controls['maleFathersName'].value;
    const maleResidence = this.marriageTranslateForm.controls['maleResidence'].value;
    const femaleName = this.marriageTranslateForm.controls['femaleName'].value;
    const femaleFathersName = this.marriageTranslateForm.controls['femaleFathersName'].value;
    const femaleResidence = this.marriageTranslateForm.controls['femaleResidence'].value;

    const frontImg = this.marriageTranslateForm.controls['frontImg'].value;
    const backImg = this.marriageTranslateForm.controls['backImg'].value;

    if (maleName == "") {

    } else if (maleFatherName == "") {

    } else if (maleResidence == "") {

    } else if (femaleName == "") {

    } else if (femaleFathersName == "") {

    } else if (femaleResidence == "") {

    } else if (frontImg == "") {

    } else if (backImg == "") {

    } else {
      this.mcTranslateModel.maleName = maleName;
      this.mcTranslateModel.maleFatherName = maleFatherName;
      this.mcTranslateModel.maleResidence = maleResidence;
      this.mcTranslateModel.femaleName = femaleName;
      this.mcTranslateModel.femaleFatherName = femaleFathersName;
      this.mcTranslateModel.femaleResidencae = femaleResidence;

      this.convertImageToBase64(frontImg).then((base64String) => {
        this.mcTranslateModel.frontImg = base64String;
      })

      this.convertImageToBase64(backImg).then((base64String) => {
        this.mcTranslateModel.backImg = base64String;
      })

      let mcTranslateAppendModel = new DocumentAppend();

      mcTranslateAppendModel.serviceId = this.serviceId;
      mcTranslateAppendModel.mcTranslateModel = this.mcTranslateModel;
      mcTranslateAppendModel.pages = 2;
      mcTranslateAppendModel.translationTitle = "Mariage Certificate Translate";
      mcTranslateAppendModel.submitedDate = (new Date());

      this.appendDocList.push(mcTranslateAppendModel);
    }
  }

  marriageTranslateFormInit() {
    this.marriageTranslateForm = this.fromBuilder.group({
      maleName: ['', Validators.required],
      maleFathersName: ['', Validators.required],
      maleResidence: ['', Validators.required],
      femaleName: ['', Validators.required],
      femaleFathersName: ['', Validators.required],
      femaleResidence: ['', Validators.required],
      frontImg: ['', Validators.required],
      backImg: ['', Validators.required]
    })
  }

  onChangeDCFrontImage(event: any) {
    const file = (event.target as any).files[0];
    this.marriageTranslateForm.patchValue({"frontImg": file});
  }

  onChangeDCBackImage(event: any) {
    const file = (event.target as any).files[0];
    this.marriageTranslateForm.patchValue({"backImg": file});
  }

  onChangeMariageFrontImage(event: any) {
    const file = (event.target as any).files[0];
    this.marriageTranslateForm.patchValue({"frontImg": file});
  }

  onChangeMariageBackImage(event: any) {
    const file = (event.target as any).files[0]; 
    this.marriageTranslateForm.patchValue({"frontImg": file});
  }

  onChangePassportFrontImage(event: any) {
    const file = (event.target as any).files[0];
    this.passportTranslateForm.patchValue({"frontImg": file});
  }

  onChangePassportBackImage(event: any) {
    const file = (event.target as any).files[0];
    this.passportTranslateForm.patchValue({"backImg": file});
  }

  passportTranslateFormInit() {
    this.passportTranslateForm = this.fromBuilder.group({
      frontImg: ['', Validators.required],
      backImg: ['', Validators.required]
    })
  }

  onSubmitPassportTranslateForm() {
    const frontImg = this.passportTranslateForm.controls['frontImg'].value;
    const backImg = this.passportTranslateForm.controls['backImg'].value;

    if (frontImg == "") {

    } else if (backImg == "") {

    } else {
      this.passportTranslateModel.frontImg = frontImg;
      this.passportTranslateModel.backImg = backImg;

      this.documentAppendModel.passportTranslateModel = this.passportTranslateModel;
      this.documentAppendModel.translationTitle = "Passport Translation";
      this.documentAppendModel.submitedDate = new Date();
      this.documentAppendModel.pages = 2;

      this.appendDocList.push(this.documentAppendModel);
    }
  }

  onSubmitBirthCertificateTranslateForm() {
    const name = this.bcTranslateForm.controls['name'].value;
    const fatherName = this.bcTranslateForm.controls['fatherName'].value;
    const motherName = this.bcTranslateForm.controls['motherName'].value;
    const frontImg = this.bcTranslateForm.controls['frontImg'].value;
    const backImg = this.bcTranslateForm.controls['backImg'].value;

    if (name == "") {

    } else if (fatherName == "") {

    } else if (motherName == "") {

    } else {
      this.bcTranslateModel.name = name;
      this.bcTranslateModel.fatherName = fatherName;
      this.bcTranslateModel.motherName = motherName;

      this.convertImageToBase64(frontImg).then((base64String) => {
        this.bcTranslateModel.frontImage = base64String;
      })

      this.convertImageToBase64(backImg).then((base64String) => {
        this.bcTranslateModel.backImage = base64String;
      })

      this.bcTranslateModel.pages = 2;

      let bcTranslateAppend = new DocumentAppend();

      bcTranslateAppend.serviceId = this.serviceId;
      bcTranslateAppend.bcTranslateModel = this.bcTranslateModel;
      bcTranslateAppend.translationTitle = "BC Translation";
      bcTranslateAppend.submitedDate = new Date();

      this.appendDocList.push(bcTranslateAppend);
    }
  }

  bcTranslateFormInit() {
    this.bcTranslateForm = this.fromBuilder.group({
      name: ['', Validators.required],
      fatherName: ['', Validators.required],
      motherName: ['', Validators.required],
      frontImg: ['',Validators.required],
      backImg: ['', Validators.required]
    })
  }

  setTranslateModalId(serviceId: number) {
    console.log(serviceId)
    if (serviceId === 1) {
      this.nicTranslateService = true;
      this.birthCertificateTranslateService = false;
      this.passportTranslateService = false;
      this.marriageTranslateService = false;
      this.deathTranslateService = false;
      this.schoolLeaveTranslateService = false;
      this.otherDocumentTranslateService = false;
      this.affidavitTranslateionService = false;
      this.deedTranslationService = false;
    } else if (serviceId == 2) {
      this.nicTranslateService = false;
      this.birthCertificateTranslateService = true;
      this.passportTranslateService = false;
      this.marriageTranslateService = false;
      this.deathTranslateService = false;
      this.schoolLeaveTranslateService = false;
      this.otherDocumentTranslateService = false;
      this.affidavitTranslateionService = false;
      this.deedTranslationService = false;

      this.serviceId = serviceId;
    } else if (serviceId == 3) {
      this.nicTranslateService = false;
      this.birthCertificateTranslateService = false;
      this.passportTranslateService = false;
      this.marriageTranslateService = true;
      this.deathTranslateService = false;
      this.schoolLeaveTranslateService = false;
      this.otherDocumentTranslateService = false;
      this.affidavitTranslateionService = false;
      this.deedTranslationService = false;

      this.serviceId = serviceId;
    } else if (serviceId == 4) {
      this.nicTranslateService = false;
      this.birthCertificateTranslateService = false;
      this.passportTranslateService = false;
      this.marriageTranslateService = false;
      this.deathTranslateService = true;
      this.schoolLeaveTranslateService = false;
      this.otherDocumentTranslateService = false;
      this.affidavitTranslateionService = false;
      this.deedTranslationService = false;

      this.serviceId = serviceId;
    } else if (serviceId == 5 || serviceId == 6 || serviceId == 8 || serviceId == 10 || serviceId == 11 || serviceId == 12 || serviceId == 14) {
      this.nicTranslateService = false;
      this.birthCertificateTranslateService = false;
      this.passportTranslateService = false;
      this.marriageTranslateService = false;
      this.deathTranslateService = false;
      this.schoolLeaveTranslateService = false;
      this.otherDocumentTranslateService = true;
      this.affidavitTranslateionService = false;
      this.deedTranslationService = false;

      this.serviceId = serviceId;
    } else if (serviceId == 7) {
      this.nicTranslateService = false;
      this.birthCertificateTranslateService = false;
      this.passportTranslateService = false;
      this.marriageTranslateService = false;
      this.deathTranslateService = false;
      this.schoolLeaveTranslateService = false;
      this.otherDocumentTranslateService = false;;
      this.affidavitTranslateionService = true;
      this.deedTranslationService = false;

      this.serviceId = serviceId;
    } else if (serviceId == 9) {
      this.nicTranslateService = false;
      this.birthCertificateTranslateService = false;
      this.passportTranslateService = false;
      this.marriageTranslateService = false;
      this.deathTranslateService = false;
      this.schoolLeaveTranslateService = true;
      this.otherDocumentTranslateService = false;
      this.affidavitTranslateionService = false;
      this.deedTranslationService = false;

      this.serviceId = serviceId;
    } else if (serviceId == 13 || serviceId == 15) {
      this.nicTranslateService = false;
      this.birthCertificateTranslateService = false;
      this.passportTranslateService = false;
      this.marriageTranslateService = false;
      this.deathTranslateService = false;
      this.schoolLeaveTranslateService = false;
      this.otherDocumentTranslateService = false;
      this.affidavitTranslateionService = false;
      this.deedTranslationService = true;

      this.serviceId = serviceId;
    }
  }

  onChangeFrontImage(event: any) {
    const file = (event.target as any).files[0];
    this.nicTranslateForm.patchValue({"frontImg": file});
  }

  onChangeBackImage(event: any) {
    const file = (event.target as any).files[0];
    this.nicTranslateForm.patchValue({"backImg": file});
  }

  onChangeBCFrontImage(event: any) {
    const file = (event.target as any).files[0];
    this.bcTranslateForm.patchValue({"frontImg": file});
  }

  onChangeBCBackImage(event: any) {
    const file = (event.target as any).files[0];
    this.bcTranslateForm.patchValue({"backImg": file});
  }

  onSubmitNicTranslateForm() {
    const nicName = this.nicTranslateForm.controls['nicName'].value;
    const birthPlace = this.nicTranslateForm.controls['birthPlace'].value;
    const address = this.nicTranslateForm.controls['address'].value;
    const frontImg = this.nicTranslateForm.controls['frontImg'].value;
    const backImg = this.nicTranslateForm.controls['backImg'].value;

    if (nicName == "") {

    } else if (birthPlace == "") {

    } else if (address == "") {

    } else if (address == "") {

    } else if (frontImg == "") {

    } else if (backImg == "") {

    } else {

      this.nicTranslatorModel.nicName = nicName;
      this.nicTranslatorModel.birthPlace = birthPlace;
      this.nicTranslatorModel.address = address;

      this.convertImageToBase64(frontImg).then((base64String) => {
        this.nicTranslatorModel.frontImg = base64String;
      });

      this.convertImageToBase64(backImg).then((base64String) => {
        this.nicTranslatorModel.backImg = base64String;
      });

      this.nicTranslatorModel.pages = 2;

      let nicModelAppend = new DocumentAppend();

      nicModelAppend.serviceId = 1;
      nicModelAppend.nicTranslateModel = this.nicTranslatorModel;
      nicModelAppend.translationTitle = "NIC Translation";
      nicModelAppend.submitedDate = new Date();
      nicModelAppend.pages = 2;

      this.appendDocList.push(nicModelAppend);
    }

    return false;
  }

  initNicTranslateForm() {
    this.nicTranslateForm = this.fromBuilder.group({
      nicName: ['', Validators.required],
      birthPlace: ['', Validators.required],
      address: ['', Validators.required],
      frontImg: ['',Validators.required],
      backImg: ['', Validators.required]
    })
  }

  onClickRemove() {
    localStorage.removeItem("selectedData");
    this.router.navigate(['app/select-services/step-02']);

    return false;
  }

  onClickPreviousBtn() {
    this.location.back();
  }

  convertImageToBase64(fileInput: any): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const file: File = fileInput;
      const reader: FileReader = new FileReader();

      reader.onloadend = () => {
        // The result attribute contains the base64 string
        const base64String: string = reader.result as string;
        resolve(base64String);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      // Read the image file as a Data URL
      reader.readAsDataURL(file);
    });
  }

}
