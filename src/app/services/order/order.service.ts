import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from 'src/app/shared/models/Order/order';
import { Request } from 'src/app/shared/models/Request/request';
import { SearchParam } from 'src/app/shared/models/SearchParam/search-param';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  placeOrderWithBankSlip(orderDetails: Order) {
    const path = environment.appURL + "place-order-with-bslip";
    return this.http.post(path, orderDetails);
  }

  placeOrderWithPaymentGateWay(orderDetails: Order) {
    const path = environment.appURL + "place-new-order-with-gateway";
    return this.http.post(path, orderDetails);
  }

  getOrderRequests(searchParamModel: SearchParam) {
    const path = environment.appURL + "get-order-requests";
    return this.http.post(path, searchParamModel);
  }

  getTrOrderInfoByInvoice(requestParamModel: Request) {
    const path = environment.appURL + "get-tr-order-info-by-invoice";
    return this.http.post(path, requestParamModel);
  }

  getDocListByOrder(requestParamModel: Request) {
    const path = environment.appURL + "get-doc-list-by-order";
    return this.http.post(path, requestParamModel);
  }

  getOrderAdminMessageList(requestParamModel: Request) {
    const path = environment.appURL + "get-message-list";
    return this.http.post(path, requestParamModel);
  }

  sendOrderMessageToAdmin(requestParamModel: Request) {
    const path = environment.appURL + "send-message";
    return this.http.post(path, requestParamModel);
  }
}
