import { DatePipe, Location } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
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
import { environment } from 'src/environments/environment.development';
declare var $: any; 

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
  deliveryTime = '';
  deliveryMethod = '';
  paymentMethod = '';
  bankSlip!: File;
  serviceId!: number;

  viewNICFormModel = false;
  viewBCFormModel = false;
  viewMCFormModel = false;
  viewDCFormModel = false;
  viewSchoolLeavingModel = false;
  viewOtherModel = false;
  viewAffidavitModel = false;
  viewDeedModel = false;

  viewNICForm!: FormGroup;
  viewBCForm!: FormGroup;
  viewMCForm!: FormGroup;
  viewDCForm!: FormGroup;
  viewSchoolLeavingForm!: FormGroup;
  viewOtherForm!: FormGroup;
  viewAffidavitForm!: FormGroup;
  viewDeedForm!: FormGroup;

  viewFormImageList: string[] = [];
  firstPageCacheObj: any[] = [];
  appendDocListCacheObj: any[] = [];

  @ViewChild('fileInput1') fileInput1!:ElementRef;
  @ViewChild('fileInput2') fileInput2!:ElementRef;
  @ViewChild('fileInput3') fileInput3!:ElementRef;
  @ViewChild('fileInput4') fileInput4!:ElementRef;
  @ViewChild('fileInput5') fileInput5!:ElementRef;
  @ViewChild('fileInput6') fileInput6!:ElementRef;

  constructor(private router: Router, private dataShareService: DataShareService, private location: Location
            , private fromBuilder: FormBuilder
            , private serviceService: ServiceService
            , private tostr: ToastrService
            , private spinner: NgxSpinnerService) {
  }

  ngOnInit() {

    const existingServices = localStorage.getItem("enableService");
    this.firstPageCacheObj = existingServices ? JSON.parse(existingServices) : [];

    const existingDocumentCache = localStorage.getItem("appendDocListCacheObj");
    this.appendDocListCacheObj = existingDocumentCache ? JSON.parse(existingDocumentCache) : [];

    this.dataShareService.getComponentValueObj().subscribe((data) => {
      this.selectedServiceList.push(data);
    })

    if (this.firstPageCacheObj != null) {
      this.selectedServiceList = [];
      this.selectedServiceList.push(this.firstPageCacheObj)
    }

    if (this.appendDocListCacheObj != null) {
      this.appendDocList = this.appendDocListCacheObj;
    }

    if (localStorage.getItem("deliveryTime")) {
      const deliveryTimeCache: any = localStorage.getItem("deliveryTime");
      this.deliveryTime = deliveryTimeCache;
    }

    if (localStorage.getItem("deliveryMethod")) {
      const deliveryMethodCache: any = localStorage.getItem("deliveryMethod");
      this.deliveryMethod = deliveryMethodCache;
    }

    if (localStorage.getItem("paymentMethod")) {
      const paymentMethodCache: any = localStorage.getItem("paymentMethod");
      this.paymentMethod = paymentMethodCache;
    }
 
    this.initNicTranslateForm();
    this.bcTranslateFormInit();
    this.passportTranslateFormInit();
    this.marriageTranslateFormInit();
    this.deathCertificateTranslateFormInit();
    this.initOtherDocumenTranslateForm();
    this.initSchoolLeavingCertificateForm();
    this.initAffidavitForm();
    this.initDeedForm();

    this.initVieForms();
  }

  initVieForms() {
    this.viewNICForm = this.fromBuilder.group({
      nicName: ['', Validators.required],
      birthPlace: ['', Validators.required],
      address: ['', Validators.required],
      frontImg: ['',Validators.required],
      backImg: ['', Validators.required]
    })

    this.viewBCForm = this.fromBuilder.group({
      name: ['', Validators.required],
      fatherName: ['', Validators.required],
      motherName: ['', Validators.required],
      frontImg: ['',Validators.required],
      backImg: ['', Validators.required]
    })

    this.viewMCForm = this.fromBuilder.group({
      maleName: ['', Validators.required],
      maleFathersName: ['', Validators.required],
      maleResidence: ['', Validators.required],
      femaleName: ['', Validators.required],
      femaleFathersName: ['', Validators.required],
      femaleResidence: ['', Validators.required],
      frontImg: ['', Validators.required],
      backImg: ['', Validators.required]
    })

    this.viewSchoolLeavingForm = this.fromBuilder.group({
      fullName: ['', Validators.required],
      schoolName: ['', Validators.required],
      frontImage: ['', Validators.required],
      backImage: ['', Validators.required]
    })

    this.viewDCForm = this.fromBuilder.group({
      name: ['', Validators.required],
      fatherName: ['', Validators.required],
      motherName: ['', Validators.required],
      frontImg: ['', Validators.required],
      backImg: ['', Validators.required]
    })

    this.viewAffidavitForm = this.fromBuilder.group({
      fullName: ['', Validators.required],
      address: ['', Validators.required],
      descriptionOfService: ['', Validators.required],
      page1: ['', Validators.required],
      page2: ['', Validators.required],
      page3: ['', Validators.required],
      page4: ['', Validators.required],
      page5: ['', Validators.required]
    })

    this.viewOtherForm = this.fromBuilder.group({
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

    this.viewDeedForm = this.fromBuilder.group({
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

  onClickViewDetails(index: number) {
    this.viewFormImageList = [];

    if (this.appendDocList[index].serviceId == 1) {
      this.viewNICFormModel = true;
      this.viewBCFormModel = false;
      this.viewMCFormModel = false;
      this.viewDCFormModel = false;
      this.viewSchoolLeavingModel = false;
      this.viewOtherModel = false;
      this.viewAffidavitModel = false;
      this.viewDeedModel = false;

      this.viewNICForm.controls['nicName'].setValue(this.appendDocList[index].nicTranslateModel.nicName);
      this.viewNICForm.controls['birthPlace'].setValue(this.appendDocList[index].nicTranslateModel.birthPlace);
      this.viewNICForm.controls['address'].setValue(this.appendDocList[index].nicTranslateModel.address);

      this.viewFormImageList.push(this.appendDocList[index].nicTranslateModel.frontImg);
      this.viewFormImageList.push(this.appendDocList[index].nicTranslateModel.backImg);

    } else if (this.appendDocList[index].serviceId == 2) {
      this.viewNICFormModel = false;
      this.viewBCFormModel = true;
      this.viewMCFormModel = false;
      this.viewDCFormModel = false;
      this.viewSchoolLeavingModel = false;
      this.viewOtherModel = false;
      this.viewAffidavitModel = false;
      this.viewDeedModel = false;

      this.viewBCForm.controls['name'].setValue(this.appendDocList[index].bcTranslateModel.name);
      this.viewBCForm.controls['fatherName'].setValue(this.appendDocList[index].bcTranslateModel.fatherName);
      this.viewBCForm.controls['motherName'].setValue(this.appendDocList[index].bcTranslateModel.motherName);

      this.viewFormImageList.push(this.appendDocList[index].bcTranslateModel.frontImage);
      this.viewFormImageList.push(this.appendDocList[index].bcTranslateModel.backImage);
    } else if (this.appendDocList[index].serviceId == 3) {
      this.viewNICFormModel = false;
      this.viewBCFormModel = false;
      this.viewMCFormModel = true;
      this.viewDCFormModel = false;
      this.viewSchoolLeavingModel = false;
      this.viewOtherModel = false;
      this.viewAffidavitModel = false;
      this.viewDeedModel = false;

      this.viewMCForm.controls['maleName'].setValue(this.appendDocList[index].mcTranslateModel.maleName);
      this.viewMCForm.controls['maleFathersName'].setValue(this.appendDocList[index].mcTranslateModel.maleFatherName);
      this.viewMCForm.controls['maleResidence'].setValue(this.appendDocList[index].mcTranslateModel.maleResidence);
      this.viewMCForm.controls['femaleName'].setValue(this.appendDocList[index].mcTranslateModel.femaleName);
      this.viewMCForm.controls['femaleFathersName'].setValue(this.appendDocList[index].mcTranslateModel.femaleFatherName);
      this.viewMCForm.controls['femaleResidence'].setValue(this.appendDocList[index].mcTranslateModel.femaleResidencae);

      this.viewFormImageList.push(this.appendDocList[index].mcTranslateModel.frontImg);
      this.viewFormImageList.push(this.appendDocList[index].mcTranslateModel.backImg);
    } else if (this.appendDocList[index].serviceId == 4) {
      this.viewNICFormModel = false;
      this.viewBCFormModel = false;
      this.viewMCFormModel = false;
      this.viewDCFormModel = true;
      this.viewSchoolLeavingModel = false;
      this.viewOtherModel = false;
      this.viewAffidavitModel = false;
      this.viewDeedModel = false;

      this.viewDCForm.controls['name'].setValue(this.appendDocList[index].dcTranslateModel.name);
      this.viewDCForm.controls['fatherName'].setValue(this.appendDocList[index].dcTranslateModel.fatherName);
      this.viewDCForm.controls['motherName'].setValue(this.appendDocList[index].dcTranslateModel.motherName);

      this.viewFormImageList.push(this.appendDocList[index].dcTranslateModel.frontImg);
      this.viewFormImageList.push(this.appendDocList[index].dcTranslateModel.backImg);
    } else if (this.appendDocList[index].serviceId == 5 || this.appendDocList[index].serviceId == 6 || this.appendDocList[index].serviceId == 8 || this.appendDocList[index].serviceId == 10 || this.appendDocList[index].serviceId == 11 || this.appendDocList[index].serviceId == 12 || this.appendDocList[index].serviceId == 14 ) {
      this.viewNICFormModel = false;
      this.viewBCFormModel = false;
      this.viewMCFormModel = false;
      this.viewDCFormModel = false;
      this.viewSchoolLeavingModel = false;
      this.viewOtherModel = true;
      this.viewAffidavitModel = false;
      this.viewDeedModel = false;

      this.viewOtherForm.controls['fullName'].setValue(this.appendDocList[index].otherDocumentModel.fullName);
      this.viewOtherForm.controls['fatherName'].setValue(this.appendDocList[index].otherDocumentModel.fatherName);
      this.viewOtherForm.controls['motherName'].setValue(this.appendDocList[index].otherDocumentModel.motherName);

      if (this.appendDocList[index].otherDocumentModel.page1 != undefined) {
        this.viewFormImageList.push(this.appendDocList[index].otherDocumentModel.page1);
      }

      if (this.appendDocList[index].otherDocumentModel.page2 != undefined) {
        this.viewFormImageList.push(this.appendDocList[index].otherDocumentModel.page2);
      }

      if (this.appendDocList[index].otherDocumentModel.page3 != undefined) {
        this.viewFormImageList.push(this.appendDocList[index].otherDocumentModel.page3);
      }

      if (this.appendDocList[index].otherDocumentModel.page4 != undefined) {
        this.viewFormImageList.push(this.appendDocList[index].otherDocumentModel.page4);
      }

      if (this.appendDocList[index].otherDocumentModel.page5 != undefined) {
        this.viewFormImageList.push(this.appendDocList[index].otherDocumentModel.page5);
      }

      if (this.appendDocList[index].otherDocumentModel.page6 != undefined) {
        this.viewFormImageList.push(this.appendDocList[index].otherDocumentModel.page6);
      }
    } else if (this.appendDocList[index].serviceId == 7) {
      this.viewNICFormModel = false;
      this.viewBCFormModel = false;
      this.viewMCFormModel = false;
      this.viewDCFormModel = false;
      this.viewSchoolLeavingModel = false;
      this.viewOtherModel = false;
      this.viewAffidavitModel = true;
      this.viewDeedModel = false;

      this.viewAffidavitForm.controls['fullName'].setValue(this.appendDocList[index].affidavitModel.fullName);
      this.viewAffidavitForm.controls['address'].setValue(this.appendDocList[index].affidavitModel.address);
      this.viewAffidavitForm.controls['desvriptionOfService'].setValue(this.appendDocList[index].affidavitModel.descriptionOfService);

      if (this.appendDocList[index].affidavitModel.page1 != undefined) {
        this.viewFormImageList.push(this.appendDocList[index].affidavitModel.page1)
      }

      if (this.appendDocList[index].affidavitModel.page2 != undefined) {
        this.viewFormImageList.push(this.appendDocList[index].affidavitModel.page2)
      }

      if (this.appendDocList[index].affidavitModel.page3 != undefined) {
        this.viewFormImageList.push(this.appendDocList[index].affidavitModel.page3)
      }

      if (this.appendDocList[index].affidavitModel.page4 != undefined) {
        this.viewFormImageList.push(this.appendDocList[index].affidavitModel.page4)
      }

      if (this.appendDocList[index].affidavitModel.page5 != undefined) {
        this.viewFormImageList.push(this.appendDocList[index].affidavitModel.page5)
      }
    } else if (this.appendDocList[index].serviceId == 9) {
      this.viewNICFormModel = false;
      this.viewBCFormModel = false;
      this.viewMCFormModel = false;
      this.viewDCFormModel = false;
      this.viewSchoolLeavingModel = true;
      this.viewOtherModel = false;
      this.viewAffidavitModel = false;
      this.viewDeedModel = false;

      this.viewSchoolLeavingForm.controls['fullName'].setValue(this.appendDocList[index].schoolLeavingCertificateModel.fullName);
      this.viewSchoolLeavingForm.controls['schoolName'].setValue(this.appendDocList[index].schoolLeavingCertificateModel.schoolname);

      this.viewFormImageList.push(this.appendDocList[index].schoolLeavingCertificateModel.frontImage)
      this.viewFormImageList.push(this.appendDocList[index].schoolLeavingCertificateModel.backImage);
    } else if (this.appendDocList[index].serviceId == 13 || this.appendDocList[index].serviceId == 15) {
      this.viewNICFormModel = false;
      this.viewBCFormModel = false;
      this.viewMCFormModel = false;
      this.viewDCFormModel = false;
      this.viewSchoolLeavingModel = false;
      this.viewOtherModel = false;
      this.viewAffidavitModel = false;
      this.viewDeedModel = true;

      this.viewDeedForm.controls['fullName'].setValue(this.appendDocList[index].deedModel.fullName);
      this.viewDeedForm.controls['address'].setValue(this.appendDocList[index].deedModel.address)

      if (this.appendDocList[index].deedModel.page1 != undefined) {
        this.viewFormImageList.push(this.appendDocList[index].deedModel.page1);
      }

      if (this.appendDocList[index].deedModel.page2 != undefined) {
        this.viewFormImageList.push(this.appendDocList[index].deedModel.page2);
      }

      if (this.appendDocList[index].deedModel.page3 != undefined) {
        this.viewFormImageList.push(this.appendDocList[index].deedModel.page3);
      }

      if (this.appendDocList[index].deedModel.page4 != undefined) {
        this.viewFormImageList.push(this.appendDocList[index].deedModel.page4);
      }

      if (this.appendDocList[index].deedModel.page5 != undefined) {
        this.viewFormImageList.push(this.appendDocList[index].deedModel.page5);
      }

      if (this.appendDocList[index].deedModel.page6 != undefined) {
        this.viewFormImageList.push(this.appendDocList[index].deedModel.page6);
      }
    }
  }

  onClickViewImage(imageName: string) {
    var image = new Image();
    image.src = imageName;

    var w: any = window.open("");
    w.document.write(image.outerHTML);
  }

  onClickRemoveRow(index: number) {
    // const index = this.appendDocList.indexOf(arrIndex);
    if (index > -1) { // only splice array when item is found
      this.appendDocList.splice(index, 1); // 2nd parameter means remove one item only
    }
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
      this.tostr.error("Empty Feilds Found", "Full Name is required.");
    } else if (address == "") {
      this.tostr.error("Empty Feilds Found", "Address is required.");
    } else if (page1 == "" && page2 == "" && page3 == "" && page4 == "" && page5 == "" && page6 == "") {
      this.tostr.error("Empty Feilds Found", "Upload Minimum 1 Pge");
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

      this.deedForm.reset();
      $("#exampleModal .close").click();
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
      this.tostr.error("Empty Feilds Found", "Full Name is required.");
    } else if (address == "") {
      this.tostr.error("Empty Feilds Found", "Full Name is required.");
    } else if (descriptionOfService == "") {
      this.tostr.error("Empty Feilds Found", "Full Name is required.");
    } else if (page1 == "" && page2 == "" && page3 == "" && page4 == "" && page5 == "") {

    } else {
      let pageCount = 0;
      this.affidavitModel.fullName = fullName;
      this.affidavitModel.address = address;
      this.affidavitModel.descriptionOfService = descriptionOfService;
      
      if (page1 != "") {
        this.convertImageToBase64(page1).then((base64String) => {
          this.affidavitModel.page1 = base64String;
        })

        pageCount += 1;
      }

      if (page2 != "") {
        this.convertImageToBase64(page2).then((base64String) => {
          this.affidavitModel.page2 = base64String;
        })

        pageCount += 1;
      }

      if (page3 != "") {
        this.convertImageToBase64(page3).then((base64String) => {
          this.affidavitModel.page3 = base64String;
        })

        pageCount += 1;
      }

      if (page4 != "") {
        this.convertImageToBase64(page4).then((base64String) => {
          this.affidavitModel.page4 = base64String;
        })

        pageCount += 1;
      }

      if (page5 != "") {
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

      this.affidavitForm.reset();
      $("#exampleModal .close").click();
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
      this.tostr.error("Empty Feilds Found", "Full Name is required");
    } else if (schoolName == "") {
      this.tostr.error("Empty Feilds Found", "School Name is required");
    } else if (frontImage == "") {
      this.tostr.error("Empty Feilds Found", "Front Image is required");
    } else if (backImage == "") {
      this.tostr.error("Empty Feilds Found", "Back Image is required");
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

      this.schoolLeavingTranslateForm.reset();
      $("#exampleModal .close").click();
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
      this.tostr.error("Empty Feilds Found", "Full Name is required");
    } else if (fatherName == "") {
      this.tostr.error("Empty Feilds Found", "Father Name is required");
    } else if (motherName == "") {
      this.tostr.error("Empty Feilds Found", "Mother Name is required");
    } else if (page1 == "" && page2 == "" && page3 == "" && page4 == "" && page5 == "" && page6 == "") {
      this.tostr.error("Empty Feilds Found", "Minimum One Page is required");
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

      // this.otherDocumentTranslateModel.pages = pageCount;

      let otherDocumentAppend = new DocumentAppend();

      otherDocumentAppend.serviceId = this.serviceId;
      otherDocumentAppend.otherDocumentModel = this.otherDocumentTranslateModel;

      if (this.serviceId == 5) {
        otherDocumentAppend.translationTitle = "Exam Result Sheet";
      } else if (this.serviceId == 6) {
        otherDocumentAppend.translationTitle = "Police Report";
      } else if (this.serviceId == 8) {
        otherDocumentAppend.translationTitle = "Other Exam Sheet";
      } else if (this.serviceId == 10) {
        otherDocumentAppend.translationTitle = "Other Certificate";
      } else if (this.serviceId == 11) {
        otherDocumentAppend.translationTitle = "Grama Niladari Certificate";
      } else if (this.serviceId == 12) {
        otherDocumentAppend.translationTitle = "Character Certificate";
      } else if (this.serviceId == 14) {
        otherDocumentAppend.translationTitle = "Title Report";
      }

      otherDocumentAppend.submitedDate = new Date();
      otherDocumentAppend.pages = pageCount;

      console.log(page3);

      pageCount = 0;
      this.otherDocumentTranslateForm.reset();
      this.fileInput1.nativeElement.value = null;
      this.fileInput2.nativeElement.value = null;
      this.fileInput3.nativeElement.value = null;
      this.fileInput4.nativeElement.value = null;
      this.fileInput5.nativeElement.value = null;
      this.fileInput6.nativeElement.value = null;

      this.otherDocumentTranslateForm.controls['image1'].setValue("");
      this.otherDocumentTranslateForm.controls['image2'].setValue("");
      this.otherDocumentTranslateForm.controls['image3'].setValue("");
      this.otherDocumentTranslateForm.controls['image4'].setValue("");
      this.otherDocumentTranslateForm.controls['image5'].setValue("");
      this.otherDocumentTranslateForm.controls['image6'].setValue("");

      this.appendDocList.push(otherDocumentAppend);

      this.otherDocumentTranslateForm.reset();
      $("#exampleModal .close").click();
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

      this.spinner.show();
      this.serviceService.getServicePriceByDeliveryTime(this.searchParamModel).subscribe((resp: any) => {

        const priceInfo = JSON.parse(JSON.stringify(resp));

        if (resp.code === 1) {
          if (eachDoc.serviceId == 1) {
            this.nicTranslatorModel.price = priceInfo.data[0].servicePrice;
          } else if (eachDoc.serviceId == 2) {
            this.bcTranslateModel.price = priceInfo.data[0].servicePrice;
          } else if (eachDoc.serviceId == 3) {
            this.mcTranslateModel.price = priceInfo.data[0].servicePrice;
          } else if (eachDoc.serviceId == 4) {
            this.dcTranslateModel.price = priceInfo.data[0].servicePrice;
          } else if (eachDoc.serviceId == 5 || eachDoc.serviceId == 6 || eachDoc.serviceId == 8 || eachDoc.serviceId == 10 || eachDoc.serviceId == 11 || eachDoc.serviceId == 12 || eachDoc.serviceId == 14) {
            this.otherDocumentTranslateModel.price = priceInfo.data[0].servicePrice;
          } else if (eachDoc.serviceId == 7) {
            this.affidavitModel.price = priceInfo.data[0].servicePrice;
          } else if (eachDoc.serviceId == 9) {
            this.schoolLeavingCertificateNModel.price = priceInfo.data[0].servicePrice;
          } else if (eachDoc.serviceId == 13 || eachDoc.serviceId == 15) {
            this.deedModel.price = priceInfo.data[0].servicePrice;
          }
        }

        this.spinner.hide();
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
      this.tostr.error("Empty Feilds Found", "Name is required");
    } else if (fatherName == "") {
      this.tostr.error("Empty Feilds Found", "Father Name is required");
    } else if (motherName == "") {
      this.tostr.error("Empty Feilds Found", "Mother Name is required");
    } else if (frontImg == "") {
      this.tostr.error("Empty Feilds Found", "Front Image is required");
    } else if (backImg == "") {
      this.tostr.error("Empty Feilds Found", "Back Image is required");
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

      this.deathTranslateForm.reset();
      $("#exampleModal .close").click();
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

    if (this.appendDocList.length == 0) {
      this.tostr.error("Upload Documents", "Please Upload Required Documents.");
    } else if (this.deliveryMethod == '' || this.deliveryTime == '' || this.paymentMethod == '') {
      this.tostr.error("Empty Properties.", "Please Select Order Properties.");
    } else {
      // const completeDocObj = {
      //   uploadedDocList: this.appendDocList,
      //   deliveryTime: this.deliveryTime,
      //   deliveryMethod: this.deliveryMethod,
      //   paymentMethod: this.paymentMethod,
      //   bankSlip: (this.paymentMethod == "1" ? this.convertImageToBase64(this.bankSlip) : null)
      // }

      if (this.paymentMethod == "1" && (this.bankSlip == null || this.bankSlip == undefined)) {
        this.tostr.error("Upload Bank Slip", "Bank Slip is Required");
      } else {

        const completeDocObj = {
          uploadedDocList: this.appendDocList,
          deliveryTime: this.deliveryTime,
          deliveryMethod: this.deliveryMethod,
          paymentMethod: this.paymentMethod,
          bankSlip: (this.paymentMethod == "1" ? this.convertImageToBase64(this.bankSlip) : null)
        }
    
        this.dataShareService.setComponentValueObj(completeDocObj);
  
        localStorage.removeItem("appendDocListCacheObj");
        localStorage.setItem("appendDocListCacheObj", JSON.stringify(this.appendDocList));
  
        localStorage.setItem("deliveryMethod", this.deliveryMethod);
        localStorage.setItem("deliveryTime", this.deliveryTime);
        localStorage.setItem("paymentMethod", this.paymentMethod);
  
        this.router.navigate(['app/select-services/step-04']);
      }
    }
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
      this.tostr.error("Empty Feilds Found", "Male Name is required");
    } else if (maleFatherName == "") {
      this.tostr.error("Empty Feilds Found", "Male Father Name is required");
    } else if (maleResidence == "") {
      this.tostr.error("Empty Feilds Found", "Male residance is required");
    } else if (femaleName == "") {
      this.tostr.error("Empty Feilds Found", "Female Name is required");
    } else if (femaleFathersName == "") {
      this.tostr.error("Empty Feilds Found", "Female Father Name is required");
    } else if (femaleResidence == "") {
      this.tostr.error("Empty Feilds Found", "Female Residance is required");
    } else if (frontImg == "") {
      this.tostr.error("Empty Feilds Found", "Front Image is required");
    } else if (backImg == "") {
      this.tostr.error("Empty Feilds Found", "Back Image is required");
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

      this.marriageTranslateForm.reset();
      $("#exampleModal .close").click();
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
    this.deathTranslateForm.patchValue({"frontImg": file});
  }

  onChangeDCBackImage(event: any) {
    const file = (event.target as any).files[0];
    this.deathTranslateForm.patchValue({"backImg": file});
  }

  onChangeMariageFrontImage(event: any) {
    const file = (event.target as any).files[0];
    this.marriageTranslateForm.patchValue({"frontImg": file});
  }

  onChangeMariageBackImage(event: any) {
    const file = (event.target as any).files[0]; 
    this.marriageTranslateForm.patchValue({"backImg": file});
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
      this.tostr.error("Empty Feilds Found", "Front Image is required");
    } else if (backImg == "") {
      this.tostr.error("Empty Feilds Found", "Back Image is required");
    } else {
      this.passportTranslateModel.frontImg = frontImg;
      this.passportTranslateModel.backImg = backImg;

      this.documentAppendModel.passportTranslateModel = this.passportTranslateModel;
      this.documentAppendModel.translationTitle = "Passport Translation";
      this.documentAppendModel.submitedDate = new Date();
      this.documentAppendModel.pages = 2;

      this.appendDocList.push(this.documentAppendModel);

      this.passportTranslateForm.reset();
      $("#exampleModal .close").click();
    }
  }

  onSubmitBirthCertificateTranslateForm() {
    const name = this.bcTranslateForm.controls['name'].value;
    const fatherName = this.bcTranslateForm.controls['fatherName'].value;
    const motherName = this.bcTranslateForm.controls['motherName'].value;
    const frontImg = this.bcTranslateForm.controls['frontImg'].value;
    const backImg = this.bcTranslateForm.controls['backImg'].value;

    if (name == "") {
      this.tostr.error("Empty Feilds Found", "Name is required");
    } else if (fatherName == "") {
      this.tostr.error("Empty Feilds Found", "Father Name is required");
    } else if (motherName == "") {
      this.tostr.error("Empty Feilds Found", "Mother Name is required");
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
      bcTranslateAppend.pages = 2;

      this.appendDocList.push(bcTranslateAppend);

      this.bcTranslateForm.reset();
      $("#exampleModal .close").click();
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
      this.tostr.error("Empty Feilds Found", "NIC Name is required");
    } else if (birthPlace == "") {
      this.tostr.error("Empty Feilds Found", "Birth Place is required");
    } else if (address == "") {
      this.tostr.error("Empty Feilds Found", "Address is required");
    } else if (frontImg == "") {
      this.tostr.error("Empty Feilds Found", "Front Image is required");
    } else if (backImg == "") {
      this.tostr.error("Empty Feilds Found", "Back Image is required");
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

      // $('#exampleModal').modal().close();
      this.nicTranslateForm.reset();
      $("#exampleModal .close").click()
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

  onClickRemove(index: number) {
    localStorage.removeItem("selectedData");

    // const index = this.appendDocList.indexOf(arrIndex);
    if (index > -1) { // only splice array when item is found
      this.selectedServiceList[0].splice(index, 1); // 2nd parameter means remove one item only
    }
    
    // this.router.navigate(['app/select-services/step-02']);

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
