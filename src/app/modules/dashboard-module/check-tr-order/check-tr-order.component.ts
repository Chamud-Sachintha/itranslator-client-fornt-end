import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription, switchMap, timer } from 'rxjs';
import { OrderService } from 'src/app/services/order/order.service';
import { AdminMessage } from 'src/app/shared/models/AdminMessage/admin-message';
import { Request } from 'src/app/shared/models/Request/request';
import { TranslateTask } from 'src/app/shared/models/TranslateTask/translate-task';
import { TranslatedDocument } from 'src/app/shared/models/TranslatedDocument/translated-document';
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

  constructor(private activatedRouter: ActivatedRoute, private orderService: OrderService, private tostr: ToastrService) {}

  ngOnInit(): void {
    this.invoiceNo = this.activatedRouter.snapshot.params['invoiceNo'];

    this.loadOrderDetailsByInvoiceNo()
    this.getTranslatedOrderDocs();
    
    this.requestParamModel.token = sessionStorage.getItem("authToken");
    this.requestParamModel.flag = sessionStorage.getItem("role");

    this.subscription = timer(0, 1500).pipe(

      switchMap(() => this.orderService.getOrderAdminMessageList(this.requestParamModel))

    ).subscribe((result: any) => {
      this.adminLessageList = [];
      const data = JSON.parse(JSON.stringify(result))

      data.data[0].forEach((eachData: AdminMessage) => {
        const formatedDate = parseInt(eachData.time) * 1000;
        eachData.time = formatedDate.toString();

        this.adminLessageList.push(eachData);
      })
    });
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

}
