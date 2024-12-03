import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CsService } from 'src/app/services/cs/cs.service';
import { OrderRequest } from 'src/app/shared/models/OrderRequest/order-request';
import { Request } from 'src/app/shared/models/Request/request';

@Component({
  selector: 'app-complete-cs-orders',
  templateUrl: './complete-cs-orders.component.html',
  styleUrls: ['./complete-cs-orders.component.css']
})
export class CompleteCsOrdersComponent {
  orderRequestsList: OrderRequest[] = [];
  requestParamModel = new Request();
  UserName: string | null = '';
  constructor(private csService: CsService, private router: Router) {}

  ngOnInit(): void {
    this.loadCSServiceOrderList();
    this.UserName = sessionStorage.getItem("username");
  }

  onClickCheckOrder(invoiceNo: string) {
    this.router.navigate(['app/check-cs-order', invoiceNo , '1'])
  }

  loadCSServiceOrderList() {
    this.requestParamModel.token = sessionStorage.getItem("authToken");
    this.requestParamModel.flag = sessionStorage.getItem("role");

    this.csService.getCompeteCSOrderList(this.requestParamModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        dataList.data[0].forEach((eachRow: OrderRequest) => {
          const formatedDate = eachRow.createTime * 1000;
          eachRow.createTime = formatedDate;

          this.orderRequestsList.push(eachRow);
        })
      }
    })
  }

}
