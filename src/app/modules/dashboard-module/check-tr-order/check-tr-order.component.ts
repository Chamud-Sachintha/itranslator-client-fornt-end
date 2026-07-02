import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { each } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { Subscription, switchMap, timer } from 'rxjs';
import { OrderService } from 'src/app/services/order/order.service';
import { WebsocketService } from 'src/app/services/websocket.service';
import { AdminMessage } from 'src/app/shared/models/AdminMessage/admin-message';
import { BCTranslateModel } from 'src/app/shared/models/BCTranslateModel/bctranslate-model';
import { DCTranslateModel } from 'src/app/shared/models/DCTranslateModel/dctranslate-model';
import { MCTranslateModel } from 'src/app/shared/models/MCTranslateModel/mctranslate-model';
import { Request } from 'src/app/shared/models/Request/request';
import { SchoolLeavingCertificateModel } from 'src/app/shared/models/SchoolLeavingCertificateModel/school-leaving-certificate-model';
import { TranslateTask } from 'src/app/shared/models/TranslateTask/translate-task';
import { TranslatedDocument } from 'src/app/shared/models/TranslatedDocument/translated-document';
import { NICTranslator } from 'src/app/shared/models/TranslatorModel/nictranslator';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-check-tr-order',
  templateUrl: './check-tr-order.component.html',
  styleUrls: ['./check-tr-order.component.css']
})
export class CheckTrOrderComponent implements OnInit {

  requestParamModel = new Request();
  taskList: TranslateTask[] = [];
  invoiceNo!: string;
  translatedDocList: TranslatedDocument[] = [];
  subscription!: Subscription;
  adminLessageList: AdminMessage[] = [];
  nicTranslateModelForm!: FormGroup;
  bcTranslateModelForm!: FormGroup;
  marriageTranslateForm!: FormGroup;
  deathTranslateForm!: FormGroup;
  otherDocumentTranslateForm!: FormGroup;
  affidavitForm!: FormGroup;
  schoolLeavingTranslateForm!: FormGroup;
  deedForm!: FormGroup;
  nicTranslateModel = false;
  bcTranslateModel = false;
  marriageTranslateModel = false;
  deathTranslateService = false;
  schoolLeaveTranslateService = false;
  otherDocumentTranslateService = false;
  affidavitTranslateionService = false;
  deedTranslationService = false;
  nicTranslateModelObj = new NICTranslator();
  bcTranslateModelObj = new BCTranslateModel();
  mcTranslateModelObj = new MCTranslateModel();
  dcTranslateModel = new DCTranslateModel();
  schoolLeavingTranslateModel = new SchoolLeavingCertificateModel();
  otherFormImagesList: string[] = [];
  affidavitImageList: string[] = [];
  deedImageList: string[] = [];
  UserName: string | null = '';
  isEditMode = false;
  currentEditingRowId?: number;
  currentDocValueObj: any = null;
  currentServiceId?: any;
  constructor(private activatedRouter: ActivatedRoute, private orderService: OrderService, private tostr: ToastrService
    , private formBuilder: FormBuilder, private websocketService: WebsocketService) { }

  ngOnInit(): void {
    this.invoiceNo = this.activatedRouter.snapshot.params['invoiceNo'];

    this.loadOrderDetailsByInvoiceNo()
    this.getTranslatedOrderDocs();
    this.UserName = sessionStorage.getItem("username");
    this.requestParamModel.token = sessionStorage.getItem("authToken");
    this.requestParamModel.flag = sessionStorage.getItem("role");

    this.orderService.getOrderAdminMessageList(this.requestParamModel).subscribe((result: any) => {
      this.adminLessageList = [];
      const data = JSON.parse(JSON.stringify(result));
      if (data && data.data && data.data[0]) {
        data.data[0].forEach((eachData: AdminMessage) => {
          const formatedDate = parseInt(eachData.time) * 1000;
          eachData.time = formatedDate.toString();
          this.adminLessageList.push(eachData);
        });
      }
    });

    this.websocketService.getEcho()
      .channel('order-chat.' + this.invoiceNo)
      .listen('.message.sent', (data: any) => {
        if (data && data.messageData) {
          const eachData = data.messageData;
          const formatedDate = parseInt(eachData.time) * 1000;
          eachData.time = formatedDate.toString();
          this.adminLessageList.push(eachData);
        }
      });

    this.initNicTranslateModelForm();
    this.initBcTranslateModelForm();
    this.marriageTranslateFormInit();
    this.initDCTranslateForm();
    this.initOtherDocumenTranslateForm();
    this.initSchoolLeavingCertificateForm();
    this.initAffidavitForm();
    this.initDeedForm();
  }

  onClickViewBcFrontImage() {
    const imageUrl = environment.fileDocImageTranslateServerURL + this.bcTranslateModelObj.frontImage;
    window.open(imageUrl);
  }

  onClickViewBcBackImage() {
    const imageUrl = environment.fileDocImageTranslateServerURL + this.bcTranslateModelObj.backImage;
    window.open(imageUrl);
  }

  onClickViewFrontImg() {
    const imageUrl = environment.fileDocImageTranslateServerURL + this.nicTranslateModelObj.frontImg;
    window.open(imageUrl);
  }

  onClickViewBackImg() {
    const imageUrl = environment.fileDocImageTranslateServerURL + this.nicTranslateModelObj.backImg;
    window.open(imageUrl);
  }

  onClickViewDCFrontImage() {
    const imageUrl = environment.fileDocImageTranslateServerURL + this.dcTranslateModel.frontImg;
    window.open(imageUrl);
  }

  onClickViewDCBackImage() {
    const imageUrl = environment.fileDocImageTranslateServerURL + this.dcTranslateModel.backImg;
    window.open(imageUrl);
  }

  onClickViewMCFrontImg() {
    const imageUrl = environment.fileDocImageTranslateServerURL + this.mcTranslateModelObj.frontImg;
    window.open(imageUrl);
  }

  onClickViewMCBackImg() {
    const imageUrl = environment.fileDocImageTranslateServerURL + this.mcTranslateModelObj.backImg;
    window.open(imageUrl);
  }

  onClickViewOtherImage(imageName: string) {
    const imageUrl = environment.fileDocImageTranslateServerURL + imageName;
    window.open(imageUrl);
  }

  onClickViewSchoolLeavingFrontImage() {
    const imageUrl = environment.fileDocImageTranslateServerURL + this.schoolLeavingTranslateModel.frontImage;
    window.open(imageUrl);
  }

  onClickViewSchoolLeavingBackImage() {
    const imageUrl = environment.fileDocImageTranslateServerURL + this.schoolLeavingTranslateModel.backImage;
    window.open(imageUrl);
  }

  initDeedForm() {
    this.deedForm = this.formBuilder.group({
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

  initAffidavitForm() {
    this.affidavitForm = this.formBuilder.group({
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

  initSchoolLeavingCertificateForm() {
    this.schoolLeavingTranslateForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      schoolName: ['', Validators.required],
      frontImage: ['', Validators.required],
      backImage: ['', Validators.required]
    })
  }

  initOtherDocumenTranslateForm() {
    this.otherDocumentTranslateForm = this.formBuilder.group({
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

  initDCTranslateForm() {
    this.deathTranslateForm = this.formBuilder.group({
      name: ['', Validators.required],
      fatherName: ['', Validators.required],
      motherName: ['', Validators.required],
      frontImg: ['', Validators.required],
      backImg: ['', Validators.required]
    })
  }

  marriageTranslateFormInit() {
    this.marriageTranslateForm = this.formBuilder.group({
      maleName: ['', Validators.required],
      maleFathersName: ['', Validators.required],
      maleResidence: ['', Validators.required],
      femaleName: ['', Validators.required],
      femaleFathersName: ['', Validators.required],
      femaleResidence: ['', Validators.required],
    })
  }

  initBcTranslateModelForm() {
    this.bcTranslateModelForm = this.formBuilder.group({
      name: ['', Validators.required],
      fatherName: ['', Validators.required],
      motherName: ['', Validators.required],
      frontImg: ['', Validators.required],
      backImg: ['', Validators.required]
    })

    this.bcTranslateModelForm.controls['name'].disable();
    this.bcTranslateModelForm.controls['fatherName'].disable();
    this.bcTranslateModelForm.controls['motherName'].disable();
  }

  initNicTranslateModelForm() {
    this.nicTranslateModelForm = this.formBuilder.group({
      nicName: ['', Validators.required],
      address: ['', Validators.required],
      birthPlace: ['', Validators.required]
    })

    this.nicTranslateModelForm.controls['nicName'].disable();
    this.nicTranslateModelForm.controls['address'].disable();
    this.nicTranslateModelForm.controls['birthPlace'].disable();
  }

  onClickViewDoc(serviceId: string, valueObj: any, isEditMode: boolean = false, orderItemId?: number) {
    this.isEditMode = isEditMode;
    this.currentEditingRowId = orderItemId;
    this.currentDocValueObj = valueObj[0];
    this.currentServiceId = serviceId;

    // Reset all document view flags to false
    this.nicTranslateModel = false;
    this.bcTranslateModel = false;
    this.marriageTranslateModel = false;
    this.deathTranslateService = false;
    this.otherDocumentTranslateService = false;
    this.schoolLeaveTranslateService = false;
    this.affidavitTranslateionService = false;
    this.deedTranslationService = false;

    this.initNicTranslateModelForm();
    this.initBcTranslateModelForm();
    this.marriageTranslateFormInit();
    this.initDCTranslateForm();
    this.initOtherDocumenTranslateForm();
    this.initSchoolLeavingCertificateForm();
    this.initAffidavitForm();
    this.initDeedForm();

    if (isEditMode) {
      if (this.nicTranslateModelForm) this.nicTranslateModelForm.enable();
      if (this.bcTranslateModelForm) this.bcTranslateModelForm.enable();
      if (this.marriageTranslateForm) this.marriageTranslateForm.enable();
      if (this.deathTranslateForm) this.deathTranslateForm.enable();
      if (this.otherDocumentTranslateForm) this.otherDocumentTranslateForm.enable();
      if (this.schoolLeavingTranslateForm) this.schoolLeavingTranslateForm.enable();
      if (this.affidavitForm) this.affidavitForm.enable();
      if (this.deedForm) this.deedForm.enable();
    } else {
      if (this.nicTranslateModelForm) this.nicTranslateModelForm.disable();
      if (this.bcTranslateModelForm) this.bcTranslateModelForm.disable();
      if (this.marriageTranslateForm) this.marriageTranslateForm.disable();
      if (this.deathTranslateForm) this.deathTranslateForm.disable();
      if (this.otherDocumentTranslateForm) this.otherDocumentTranslateForm.disable();
      if (this.schoolLeavingTranslateForm) this.schoolLeavingTranslateForm.disable();
      if (this.affidavitForm) this.affidavitForm.disable();
      if (this.deedForm) this.deedForm.disable();
    }

    if (serviceId == "1") {
      this.nicTranslateModel = true;

      this.nicTranslateModelForm.controls['nicName'].setValue(valueObj[0].nicName);
      this.nicTranslateModelForm.controls['address'].setValue(valueObj[0].address);
      this.nicTranslateModelForm.controls['birthPlace'].setValue(valueObj[0].birthPlace);
      this.nicTranslateModelObj.frontImg = valueObj[0].frontImg;
      this.nicTranslateModelObj.backImg = valueObj[0].backImg;
    } else if (serviceId == "2") {
      this.bcTranslateModel = true;

      this.bcTranslateModelForm.controls['name'].setValue(valueObj[0].name);
      this.bcTranslateModelForm.controls['fatherName'].setValue(valueObj[0].fatherName);
      this.bcTranslateModelForm.controls['motherName'].setValue(valueObj[0].motherName);
      this.bcTranslateModelObj.frontImage = valueObj[0].frontImage;
      this.bcTranslateModelObj.backImage = valueObj[0].backImage;
    } else if (serviceId == "3") {
      this.marriageTranslateModel = true;

      this.marriageTranslateForm.controls['maleName'].setValue(valueObj[0].maleName);
      this.marriageTranslateForm.controls['maleFathersName'].setValue(valueObj[0].maleFatherName || valueObj[0].maleFathersName || '');
      this.marriageTranslateForm.controls['maleResidence'].setValue(valueObj[0].maleResidence);

      this.marriageTranslateForm.controls['femaleName'].setValue(valueObj[0].femaleName);
      this.marriageTranslateForm.controls['femaleFathersName'].setValue(valueObj[0].femaleFatherName || valueObj[0].femaleFathersName || '');
      this.marriageTranslateForm.controls['femaleResidence'].setValue(valueObj[0].femaleResidencae || valueObj[0].femaleResidence || '');

      this.mcTranslateModelObj.frontImg = valueObj[0].frontImg;
      this.mcTranslateModelObj.backImg = valueObj[0].backImg;
    } else if (serviceId == "4") {
      this.deathTranslateService = true;

      this.deathTranslateForm.controls['name'].setValue(valueObj[0].name);
      this.deathTranslateForm.controls['fatherName'].setValue(valueObj[0].fatherName);
      this.deathTranslateForm.controls['motherName'].setValue(valueObj[0].motherName);
      this.dcTranslateModel.frontImg = valueObj[0].frontImg;
      this.dcTranslateModel.backImg = valueObj[0].backImg;
    } else if (serviceId == "5" || serviceId == "6" || serviceId == "8" || serviceId == "10" || serviceId == "11" || serviceId == "12" || serviceId == "14") {

      this.otherFormImagesList = [];

      this.otherDocumentTranslateService = true;

      this.otherDocumentTranslateForm.controls['fullName'].setValue(valueObj[0].fullName);
      this.otherDocumentTranslateForm.controls['fatherName'].setValue(valueObj[0].fatherName);
      this.otherDocumentTranslateForm.controls['motherName'].setValue(valueObj[0].motherName);

      if ("page1" in valueObj[0]) {
        this.otherFormImagesList.push(valueObj[0].page1);
      }

      if ("page2" in valueObj[0]) {
        this.otherFormImagesList.push(valueObj[0].page2);
      }

      if ("page3" in valueObj[0]) {
        this.otherFormImagesList.push(valueObj[0].page3);
      }

      if ("page4" in valueObj[0]) {
        this.otherFormImagesList.push(valueObj[0].page4);
      }

      if ("page5" in valueObj[0]) {
        this.otherFormImagesList.push(valueObj[0].page5);
      }

      if ("page6" in valueObj[0]) {
        this.otherFormImagesList.push(valueObj[0].page6);
      }
    } else if (serviceId == "9") {
      this.schoolLeaveTranslateService = true;

      this.schoolLeavingTranslateForm.controls['fullName'].setValue(valueObj[0].fullName);
      this.schoolLeavingTranslateForm.controls['schoolName'].setValue(valueObj[0].schoolname || valueObj[0].schoolName);
      this.schoolLeavingTranslateModel.frontImage = valueObj[0].frontImage;
      this.schoolLeavingTranslateModel.backImage = valueObj[0].backImage;
    } else if (serviceId == "7") {

      this.affidavitImageList = [];

      this.nicTranslateModel = false;
      this.bcTranslateModel = false;
      this.deathTranslateService = false;
      this.marriageTranslateModel = false;
      this.otherDocumentTranslateService = false;
      this.schoolLeaveTranslateService = false;
      this.affidavitTranslateionService = true;

      this.affidavitForm.controls['fullName'].setValue(valueObj[0].fullName);
      this.affidavitForm.controls['address'].setValue(valueObj[0].address);
      this.affidavitForm.controls['descriptionOfService'].setValue(valueObj[0].descriptionOfService);

      if ("page1" in valueObj[0]) {
        this.affidavitImageList.push(valueObj[0].page1);
      }

      if ("page2" in valueObj[0]) {
        this.affidavitImageList.push(valueObj[0].page2);
      }

      if ("page3" in valueObj[0]) {
        this.affidavitImageList.push(valueObj[0].page3);
      }

      if ("page4" in valueObj[0]) {
        this.affidavitImageList.push(valueObj[0].page4);
      }

      if ("page5" in valueObj[0]) {
        this.affidavitImageList.push(valueObj[0].page5);
      }

    } else if (serviceId == "13" || serviceId == "15") {

      this.deedImageList = [];

      this.nicTranslateModel = false;
      this.bcTranslateModel = false;
      this.deathTranslateService = false;
      this.marriageTranslateModel = false;
      this.otherDocumentTranslateService = false;
      this.schoolLeaveTranslateService = false;
      this.affidavitTranslateionService = false;
      this.deedTranslationService = true;

      this.deedForm.controls['fullName'].setValue(valueObj[0].fullName);
      this.deedForm.controls['address'].setValue(valueObj[0].address);

      if ("page1" in valueObj[0]) {
        this.deedImageList.push(valueObj[0].page1);
      }

      if ("page2" in valueObj[0]) {
        this.deedImageList.push(valueObj[0].page2);
      }

      if ("page3" in valueObj[0]) {
        this.deedImageList.push(valueObj[0].page3);
      }

      if ("page4" in valueObj[0]) {
        this.deedImageList.push(valueObj[0].page4);
      }

      if ("page5" in valueObj[0]) {
        this.deedImageList.push(valueObj[0].page5);
      }

      if ("page6" in valueObj[0]) {
        this.deedImageList.push(valueObj[0].page6);
      }
    }
  }

  onClickUpdateOrderStatus(orderStatus: string) {
    this.requestParamModel.token = sessionStorage.getItem("authToken");
    this.requestParamModel.flag = sessionStorage.getItem("role");
    this.requestParamModel.invoiceNo = this.invoiceNo;
    this.requestParamModel.orderStatus = orderStatus;

    this.orderService.updateOrderStatus(this.requestParamModel).subscribe((resp: any) => {

      if (resp.code === 1) {
        this.tostr.success("Update Order Status", "Order Status Updated Successfully.");
      } else {
        this.tostr.error("Update Order Status", resp.message);
      }
    })
  }

  onClickViewDocument(documentName: string) {
    const filePath = environment.fileServerURL + documentName;
    window.open(filePath);
  }

  sendOrderMessageToAdmin(message: string) {
    this.requestParamModel.token = sessionStorage.getItem("authToken");
    this.requestParamModel.flag = sessionStorage.getItem("role");
    this.requestParamModel.message = message;
    this.requestParamModel.invoiceNo = this.invoiceNo;

    this.orderService.sendOrderMessageToAdmin(this.requestParamModel).subscribe((resp: any) => {

      if (resp.code === 1) {
        const localMsg: AdminMessage = {
          toUser: 'Admin',
          fromUser: this.UserName || 'Client',
          message: message,
          time: new Date().getTime().toString(),
          avatar: ''
        };
        this.adminLessageList.push(localMsg);
      }
    })
  }

  getTranslatedOrderDocs() {
    this.requestParamModel.token = sessionStorage.getItem("authToken");
    this.requestParamModel.flag = sessionStorage.getItem("role");
    this.requestParamModel.invoiceNo = this.invoiceNo;

    this.orderService.getDocListByOrder(this.requestParamModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        dataList.data[0].forEach((eachDoc: TranslatedDocument) => {
          this.translatedDocList.push(eachDoc);
        })
      }
    })
  }

  loadOrderDetailsByInvoiceNo() {

    this.requestParamModel.token = sessionStorage.getItem("authToken");
    this.requestParamModel.flag = sessionStorage.getItem("role");
    this.requestParamModel.invoiceNo = this.invoiceNo;

    this.orderService.getTrOrderInfoByInvoice(this.requestParamModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        dataList.data[0].forEach((eachRow: TranslateTask) => {
          const formatedCreatedDate = parseInt(eachRow.createTime) * 1000;
          const formatedAssignedTime = parseInt(eachRow.assignedTime) * 1000;

          eachRow.createTime = formatedCreatedDate.toString();
          eachRow.assignedTime = formatedAssignedTime.toString();

          this.taskList.push(eachRow);
        })
      } else {
        this.tostr.error("Order Assign", resp.message)
      }
    })
  }

  onSubmitUpdateDoc(serviceId?: string) {
    const activeServiceId = serviceId || this.currentServiceId || '';
    let updatedModel: any = {};
    if (activeServiceId == "1") {
      updatedModel = {
        ...this.currentDocValueObj,
        nicName: this.nicTranslateModelForm.value.nicName,
        address: this.nicTranslateModelForm.value.address,
        birthPlace: this.nicTranslateModelForm.value.birthPlace
      };
    } else if (activeServiceId == "2") {
      updatedModel = {
        ...this.currentDocValueObj,
        name: this.bcTranslateModelForm.value.name,
        fatherName: this.bcTranslateModelForm.value.fatherName,
        motherName: this.bcTranslateModelForm.value.motherName
      };
    } else if (activeServiceId == "3") {
      updatedModel = {
        ...this.currentDocValueObj,
        maleName: this.marriageTranslateForm.value.maleName,
        maleFatherName: this.marriageTranslateForm.value.maleFathersName,
        maleResidence: this.marriageTranslateForm.value.maleResidence,
        femaleName: this.marriageTranslateForm.value.femaleName,
        femaleFatherName: this.marriageTranslateForm.value.femaleFathersName,
        femaleResidencae: this.marriageTranslateForm.value.femaleResidence
      };
    } else if (activeServiceId == "4") {
      updatedModel = {
        ...this.currentDocValueObj,
        name: this.deathTranslateForm.value.name,
        fatherName: this.deathTranslateForm.value.fatherName,
        motherName: this.deathTranslateForm.value.motherName
      };
    } else if (["5", "6", "8", "10", "11", "12", "14"].includes(activeServiceId)) {
      updatedModel = {
        ...this.currentDocValueObj,
        fullName: this.otherDocumentTranslateForm.value.fullName,
        fatherName: this.otherDocumentTranslateForm.value.fatherName,
        motherName: this.otherDocumentTranslateForm.value.motherName
      };
    } else if (activeServiceId == "9") {
      updatedModel = {
        ...this.currentDocValueObj,
        fullName: this.schoolLeavingTranslateForm.value.fullName,
        schoolName: this.schoolLeavingTranslateForm.value.schoolName
      };
    } else if (activeServiceId == "7") {
      updatedModel = {
        ...this.currentDocValueObj,
        fullName: this.affidavitForm.value.fullName,
        address: this.affidavitForm.value.address,
        descriptionOfService: this.affidavitForm.value.descriptionOfService
      };
    } else if (activeServiceId == "13" || activeServiceId == "15") {
      updatedModel = {
        ...this.currentDocValueObj,
        fullName: this.deedForm.value.fullName,
        address: this.deedForm.value.address
      };
    }

    const payload = {
      token: sessionStorage.getItem("authToken"),
      flag: sessionStorage.getItem("role"),
      orderItemId: this.currentEditingRowId,
      jsonValue: JSON.stringify(updatedModel)
    };

    this.orderService.updateOrderItemDetails(payload).subscribe((resp: any) => {
      if (resp.code === 1) {
        this.tostr.success("Update Details", "Document details updated successfully.");
        $("#exampleModal .close").click();
        this.taskList = [];
        this.loadOrderDetailsByInvoiceNo();
      } else {
        this.tostr.error("Update Details", resp.message || "Failed to update details.");
      }
    });

    return false;
  }

}
