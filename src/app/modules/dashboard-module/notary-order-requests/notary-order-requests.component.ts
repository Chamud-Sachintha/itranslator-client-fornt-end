import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotaryService } from 'src/app/services/notary/notary.service';
import { OrderRequest } from 'src/app/shared/models/OrderRequest/order-request';
import { Request } from 'src/app/shared/models/Request/request';

@Component({
  selector: 'app-notary-order-requests',
  templateUrl: './notary-order-requests.component.html',
  styleUrls: ['./notary-order-requests.component.css']
})
export class NotaryOrderRequestsComponent implements OnInit {

  orderRequestsList: OrderRequest[] = [];
  requestParamModel = new Request();

  constructor(private notaryService: NotaryService, private router: Router) {}

  ngOnInit(): void {
    this.loadNotaryServiceOrderList();
  }

  onClickCheckOrder(invoiceNo: string) {
    this.router.navigate(['app/check-ns-order', invoiceNo])
  }

  loadNotaryServiceOrderList() {
    this.requestParamModel.token = sessionStorage.getItem("authToken");
    this.requestParamModel.flag = sessionStorage.getItem("role");

    this.notaryService.getNotaryOrderList(this.requestParamModel).subscribe((resp: any) => {

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
