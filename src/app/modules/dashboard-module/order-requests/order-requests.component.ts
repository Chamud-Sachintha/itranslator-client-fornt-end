import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order/order.service';
import { Order } from 'src/app/shared/models/Order/order';
import { OrderRequest } from 'src/app/shared/models/OrderRequest/order-request';
import { SearchParam } from 'src/app/shared/models/SearchParam/search-param';

@Component({
  selector: 'app-order-requests',
  templateUrl: './order-requests.component.html',
  styleUrls: ['./order-requests.component.css']
})
export class OrderRequestsComponent implements OnInit {

  orderRequestsList: OrderRequest[] = [];
  searchParamModel = new SearchParam();

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.getOrderRequestList();
  }

  getOrderRequestList() {
    this.searchParamModel.token = sessionStorage.getItem("authToken");
    this.searchParamModel.flag = sessionStorage.getItem("role");

    this.orderService.getOrderRequests(this.searchParamModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        dataList.data[0].forEach((eachRequest: OrderRequest) => {
          const formatedDate = eachRequest.create_time * 1000;
          eachRequest.create_time = formatedDate;
          
          this.orderRequestsList.push(eachRequest);
        })
      }
    })
  }

}
