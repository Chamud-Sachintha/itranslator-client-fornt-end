import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DataShareService } from 'src/app/services/data/data-share.service';
import { ExportService } from 'src/app/services/export/export.service';
import { OrderService } from 'src/app/services/order/order.service';
import { SmsService } from 'src/app/services/sms/sms.service';
import { Invoice } from 'src/app/shared/models/Invoice/invoice';
import { InvoiceTable } from 'src/app/shared/models/InvoiceTable/invoice-table';
import { Order } from 'src/app/shared/models/Order/order';
import { OrderNotification } from 'src/app/shared/models/OrderNotification/order-notification';
import { Request } from 'src/app/shared/models/Request/request';
declare var $: any; 

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  invoiceItemList: InvoiceTable[] = [];
  inviceTableObj = new InvoiceTable();
  requestParamModel = new Request();
  invoiceModel = new Invoice();
  orderDetails = new Order();
  sendDataObj!: any;
  bankSlip: boolean = false;
  uploadedSlip: any[] = [];
  uploadeDocumentList: any[] = [];
  invoiceIssuedDate = new Date();
  orderNotificationModel = new OrderNotification();
  invoiceNo!: string;
  deliveryMethod!: string;
  bankSlipCacheObj!: any;

  constructor(private dataShareService: DataShareService, private orderService: OrderService, private tostr: ToastrService, private spinner: NgxSpinnerService
            , private authService: AuthService, private smsService: SmsService, private exportService: ExportService
            , private router: Router) {}

  ngOnInit(): void {

    this.bankSlipCacheObj = localStorage.getItem("bankSlip");
    this.getClientInfo();

    this.invoiceNo = this.dataShareService.generateInvoiceNo("TR");

    this.dataShareService.getComponentValueObj().subscribe((data: any) => {

      this.uploadedSlip.push(data.bankSlip);

      const dataList = JSON.parse(JSON.stringify(data));
      this.sendDataObj = data;

      if (data.paymentMethod != 2) {
        if (this.bankSlipCacheObj != null){
          this.bankSlip = true;
        } else if (data.bankSlip != null) {
          if (data.bankSlip.__zone_symbol__value) {
            this.bankSlip = true;
          }
        }
      } else {
        this.bankSlip = false;
      }

      let totalAmount = 0;
      dataList.uploadedDocList.forEach((eachDoc: any) => {
        
        let invoiceObj = new InvoiceTable();

        invoiceObj.documentTitle = eachDoc.translationTitle;
        invoiceObj.pages = eachDoc.pages;
        
        console.log(eachDoc.nicTranslateModel)

        if (eachDoc.nicTranslateModel !== undefined) {
          invoiceObj.unitPrice = eachDoc.nicTranslateModel.price;
        } else if (eachDoc.bcTranslateModel !== undefined) {
          invoiceObj.unitPrice = eachDoc.bcTranslateModel.price;
        } else if (eachDoc.otherDocumentModel !== undefined) {
          invoiceObj.unitPrice = eachDoc.otherDocumentModel.price * invoiceObj.pages;
        } else if (eachDoc.dcTranslateModel !== undefined) {
          invoiceObj.unitPrice = eachDoc.dcTranslateModel.price;
        } else if (eachDoc.affidavitModel != undefined) {
          invoiceObj.unitPrice = eachDoc.affidavitModel.price * invoiceObj.pages;
        } else if (eachDoc.deedModel != undefined) {
          invoiceObj.unitPrice = eachDoc.deedModel.price * invoiceObj.pages;
        } else if (eachDoc.schoolLeavingCertificateModel != undefined) {
          invoiceObj.unitPrice = eachDoc.schoolLeavingCertificateModel.price;
        } else if (eachDoc.mcTranslateModel != undefined) {
          invoiceObj.unitPrice = eachDoc.mcTranslateModel.price;
        }

        totalAmount += Number(invoiceObj.unitPrice);

        this.invoiceItemList.push(invoiceObj);
      })

      // need to change total amount according to delivery method

      this.deliveryMethod = dataList.deliveryMethod;

      if (this.deliveryMethod === "3") {
        totalAmount += 500;
      } else if (this.deliveryMethod === "4") {
        totalAmount += 1000;
      }

      this.inviceTableObj.amount = totalAmount;
    })
  }

  onClickPreviousBtn() {
    this.router.navigate(['/app/select-services/step-03'])
  }

  printInvoice() {
    window.print();
    return false;
  }

  exportPDF() {
    this.orderDetails.token = sessionStorage.getItem("authToken");
    this.orderDetails.flag = sessionStorage.getItem("role");
    this.uploadeDocumentList.push(this.sendDataObj.uploadedDocList);

    this.orderDetails.deliveryTimeType = this.sendDataObj.deliveryTime;
    this.orderDetails.deliveryMethod = this.sendDataObj.deliveryMethod;
    this.orderDetails.paymentMethod = this.sendDataObj.paymentMethod;
    this.orderDetails.totalAmount = this.inviceTableObj.amount;
    this.orderDetails.invoiceNo = this.invoiceNo

    this.orderDetails.valueObjModel = this.uploadeDocumentList[0];

    this.orderDetails.fullName = this.invoiceModel.invoiceTo;
    this.orderDetails.address = this.invoiceModel.invoiceAddress;
    this.orderDetails.mobileNumber = this.invoiceModel.mobileNumber;

    this.exportService.exportInvoiceAsPDF(this.orderDetails).subscribe((blob: any) => {
      const a = document.createElement('a');
        const objectUrl = URL.createObjectURL(blob);
        a.href = objectUrl;
        a.download = 'invoice.pdf';  // You can use a dynamic name here based on your invoice object
        a.click();
        URL.revokeObjectURL(objectUrl);
    })
  }

  placeOnlinePayment() {

    this.orderDetails.token = sessionStorage.getItem("authToken");
    this.orderDetails.flag = sessionStorage.getItem("role");
    this.uploadeDocumentList.push(this.sendDataObj.uploadedDocList);

    this.orderDetails.deliveryTimeType = this.sendDataObj.deliveryTime;
    this.orderDetails.deliveryMethod = this.sendDataObj.deliveryMethod;
    this.orderDetails.paymentMethod = this.sendDataObj.paymentMethod;
    this.orderDetails.totalAmount = this.inviceTableObj.amount;
    this.orderDetails.invoiceNo = this.invoiceNo

    this.orderDetails.valueObjModel = this.uploadeDocumentList[0];

    this.spinner.show();
    this.orderService.placeOrderWithPaymentGateWay(this.orderDetails).subscribe((resp: any) => {
      
      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        const redirectUrl = dataList.data[0].redirect_url;
        $('#exampleModal').modal('show');
        sessionStorage.setItem("reference", dataList.data[0].reference);

        window.open(redirectUrl);
      }

      this.spinner.hide();
      this.resetCache();
    })
  }

  placeOrderWithBankSlip() {

    this.orderDetails.token = sessionStorage.getItem("authToken");
    this.orderDetails.flag = sessionStorage.getItem("role");
    this.uploadeDocumentList.push(this.sendDataObj.uploadedDocList);

    this.orderDetails.bankSlip = this.sendDataObj.bankSlip.__zone_symbol__value;

    if (this.bankSlipCacheObj != null || this.bankSlipCacheObj != undefined) {
      this.orderDetails.bankSlip = this.bankSlipCacheObj;
    }
    
    this.orderDetails.deliveryTimeType = this.sendDataObj.deliveryTime;
    this.orderDetails.deliveryMethod = this.sendDataObj.deliveryMethod;
    this.orderDetails.paymentMethod = this.sendDataObj.paymentMethod;
    this.orderDetails.totalAmount = this.inviceTableObj.amount;
    this.orderDetails.invoiceNo = this.invoiceNo;

    const mapped = Object.entries(this.sendDataObj.uploadedDocList[0]).map(([type, value]) => ({type, value}));

    this.orderDetails.valueObjModel = this.uploadeDocumentList[0];

    this.spinner.show();
    this.orderService.placeOrderWithBankSlip(this.orderDetails).subscribe((resp: any) => {
      if (resp.code === 1) {
        setTimeout(() => {
          this.orderNotificationModel.token = sessionStorage.getItem("authToken");
          this.orderNotificationModel.flag = sessionStorage.getItem("role");
          this.orderNotificationModel.orderNumber = this.orderDetails.invoiceNo;
          this.orderNotificationModel.orderType = "TR";

          this.smsService.sendOrderPlaceNotification(this.orderNotificationModel).subscribe((resp: any) => {
            console.log(resp);
          })
        }, 1000);
        this.tostr.success("Place New Order", "Order Placed Successfully");
      } else {
        this.tostr.error("Place New Order", resp.message);
      }

      this.spinner.hide();
      this.resetCache()
    })
  }

  resetCache() {
    localStorage.clear();
  }

  getClientInfo() {
    this.requestParamModel.token = sessionStorage.getItem("authToken");
    this.requestParamModel.flag = sessionStorage.getItem("role");

    this.authService.getProfileInfo(this.requestParamModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        this.invoiceModel.invoiceTo = dataList.data[0].full_name;
        this.invoiceModel.invoiceAddress = dataList.data[0].address;
        this.invoiceModel.mobileNumber = dataList.data[0].mobile_number;
      }
    })
  }

}
