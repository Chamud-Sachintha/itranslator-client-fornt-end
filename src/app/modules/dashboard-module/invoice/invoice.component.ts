import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DataShareService } from 'src/app/services/data/data-share.service';
import { OrderService } from 'src/app/services/order/order.service';
import { InvoiceTable } from 'src/app/shared/models/InvoiceTable/invoice-table';
import { Order } from 'src/app/shared/models/Order/order';
import * as $ from 'jquery';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  invoiceItemList: InvoiceTable[] = [];
  inviceTableObj = new InvoiceTable();
  orderDetails = new Order();
  sendDataObj!: any;
  bankSlip: boolean = false;
  uploadedSlip: any[] = [];
  uploadeDocumentList: any[] = [];

  constructor(private dataShareService: DataShareService, private orderService: OrderService, private tostr: ToastrService, private spinner: NgxSpinnerService) {}

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
        
        if (eachDoc.nicTranslateModel !== undefined) {
          invoiceObj.unitPrice = eachDoc.nicTranslateModel.price;
        } else if (eachDoc.bcTranslateModel !== undefined) {
          invoiceObj.unitPrice = eachDoc.bcTranslateModel.price;
        } else if (eachDoc.otherDocumentModel !== undefined) {
          invoiceObj.unitPrice = eachDoc.otherDocumentModel.price * invoiceObj.pages;
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

    this.orderDetails.valueObjModel = this.uploadeDocumentList[0];

    this.spinner.show();
    this.orderService.placeOrderWithPaymentGateWay(this.orderDetails).subscribe((resp: any) => {
      
      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        const redirectUrl = dataList.data[0].redirect_url;
        window.open(redirectUrl);

        $('#exampleModal').show();
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

    const mapped = Object.entries(this.sendDataObj.uploadedDocList[0]).map(([type, value]) => ({type, value}));

    this.orderDetails.valueObjModel = this.uploadeDocumentList[0];

    this.orderService.placeOrderWithBankSlip(this.orderDetails).subscribe((resp: any) => {
      console.log(resp)
    })
  }

  getClientInfo() {

  }

}
