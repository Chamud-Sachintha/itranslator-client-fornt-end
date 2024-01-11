import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DataShareService } from 'src/app/services/data/data-share.service';
import { OrderService } from 'src/app/services/order/order.service';
import { Invoice } from 'src/app/shared/models/Invoice/invoice';
import { InvoiceTable } from 'src/app/shared/models/InvoiceTable/invoice-table';
import { Order } from 'src/app/shared/models/Order/order';
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

  constructor(private dataShareService: DataShareService, private orderService: OrderService, private tostr: ToastrService, private spinner: NgxSpinnerService
            , private authService: AuthService) {}

  ngOnInit(): void {

    this.getClientInfo();

    this.dataShareService.getComponentValueObj().subscribe((data: any) => {

      this.uploadedSlip.push(data.bankSlip);

      const dataList = JSON.parse(JSON.stringify(data));
      this.sendDataObj = data;

      if (data.bankSlip != null) {
        if (data.bankSlip.__zone_symbol__value) {
          this.bankSlip = true;
        }
      }

      let totalAmount = 0;
      dataList.uploadedDocList.forEach((eachDoc: any) => {
        
        let invoiceObj = new InvoiceTable();

        invoiceObj.documentTitle = eachDoc.translationTitle;
        invoiceObj.pages = eachDoc.pages;

        console.log(eachDoc)
        
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

      this.inviceTableObj.amount = totalAmount;
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
    this.orderDetails.invoiceNo = this.dataShareService.generateInvoiceNo("TR");

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
    })
  }

  placeOrderWithBankSlip() {

    this.orderDetails.token = sessionStorage.getItem("authToken");
    this.orderDetails.flag = sessionStorage.getItem("role");
    this.uploadeDocumentList.push(this.sendDataObj.uploadedDocList);

    this.orderDetails.bankSlip = this.sendDataObj.bankSlip.__zone_symbol__value;
    this.orderDetails.deliveryTimeType = this.sendDataObj.deliveryTime;
    this.orderDetails.deliveryMethod = this.sendDataObj.deliveryMethod;
    this.orderDetails.paymentMethod = this.sendDataObj.paymentMethod;
    this.orderDetails.totalAmount = this.inviceTableObj.amount;
    this.orderDetails.invoiceNo = this.dataShareService.generateInvoiceNo("TR");

    const mapped = Object.entries(this.sendDataObj.uploadedDocList[0]).map(([type, value]) => ({type, value}));

    this.orderDetails.valueObjModel = this.uploadeDocumentList[0];

    this.spinner.show();
    this.orderService.placeOrderWithBankSlip(this.orderDetails).subscribe((resp: any) => {
      if (resp.code === 1) {
        this.tostr.success("Place New Order", "Order Placed Successfully");
      } else {
        this.tostr.error("Place New Order", resp.message);
      }

      this.spinner.hide();
    })
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
