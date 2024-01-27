import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CsService } from 'src/app/services/cs/cs.service';
import { OrderRequest } from 'src/app/shared/models/OrderRequest/order-request';
import { Request } from 'src/app/shared/models/Request/request';

@Component({
  selector: 'app-cs-order-requests',
  templateUrl: './cs-order-requests.component.html',
  styleUrls: ['./cs-order-requests.component.css']
})
export class CsOrderRequestsComponent implements OnInit {

  orderRequestsList: OrderRequest[] = [];
  requestParamModel = new Request();

  constructor(private csService: CsService, private router: Router) {}

  ngOnInit(): void {
    this.loadCSServiceOrderList();
  }

  onClickCheckOrder(invoiceNo: string) {
    // this.router.navigate(['app/check-ns-order', invoiceNo])
  }

  loadCSServiceOrderList() {
    this.requestParamModel.token = sessionStorage.getItem("authToken");
    this.requestParamModel.flag = sessionStorage.getItem("role");

    this.csService.getCSOrderList(this.requestParamModel).subscribe((resp: any) => {

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