import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order/order.service';
import { CompleteOrder } from 'src/app/shared/models/CompleteOrder/complete-order';
import { Request } from 'src/app/shared/models/Request/request';

@Component({
  selector: 'app-complete-tr-orders',
  templateUrl: './complete-tr-orders.component.html',
  styleUrls: ['./complete-tr-orders.component.css']
})
export class CompleteTrOrdersComponent implements OnInit {

  requestParamModel = new Request();
  completeOrderList: CompleteOrder[] = [];
  UserName: string | null = '';
  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadCompleteOrderList();
    this.UserName = sessionStorage.getItem("username");
  }

  loadCompleteOrderList() {

    this.requestParamModel.token = sessionStorage.getItem("authToken");
    this.requestParamModel.flag = sessionStorage.getItem("role");
    this.requestParamModel.type = "TR";

    this.orderService.getCompleteOrderList(this.requestParamModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        dataList.data[0].forEach((el: CompleteOrder) => {
          const formatedOrderPlaceDate = parseInt(el.orderPlacedDate) * 1000;
          const formatedClosedDate = parseInt(el.closedDate) * 1000;

          el.orderPlacedDate = formatedClosedDate.toString();
          el.closedDate = formatedClosedDate.toString();
          this.completeOrderList.push(el);
        });
      }
    })
  }

}
