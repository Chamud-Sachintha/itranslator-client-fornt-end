import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/order/order.service';
import { Request } from 'src/app/shared/models/Request/request';
import { TranslateTask } from 'src/app/shared/models/TranslateTask/translate-task';

@Component({
  selector: 'app-check-tr-order',
  templateUrl: './check-tr-order.component.html',
  styleUrls: ['./check-tr-order.component.css']
})
export class CheckTrOrderComponent implements OnInit {

  requestParamModel = new Request();
  taskList: TranslateTask[] = [];
  invoiceNo!: string;

  constructor(private activatedRouter: ActivatedRoute, private orderService: OrderService) {}

  ngOnInit(): void {
    this.invoiceNo = this.activatedRouter.snapshot.params['invoiceNo'];

    this.loadOrderDetailsByInvoiceNo()
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
      }
    })
  }

}
