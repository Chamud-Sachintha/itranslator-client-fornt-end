import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from 'src/app/shared/models/Order/order';
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

  getOrderRequests(searchParamModel: SearchParam) {
    const path = environment.appURL + "get-order-requests";
    return this.http.post(path, searchParamModel);
  }
}
