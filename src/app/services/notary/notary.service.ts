import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Request } from 'src/app/shared/models/Request/request';
import { SearchParam } from 'src/app/shared/models/SearchParam/search-param';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class NotaryService {

  constructor(private http: HttpClient) { }

  getMainCategoryList(searchParamModel: SearchParam) {
    const path = environment.appURL + "get-main-notary-cat-list";
    return this.http.post(path, searchParamModel);
  }

  getSubCatListByMainCategory(searchParamModel: SearchParam) {
    const path = environment.appURL + "get-first-cat-list-by-main-cat-code";
    return this.http.post(path, searchParamModel);
  }

  placeNotaryServiceOrder(notaryServiceOrderModel: Request) {
    const path = environment.appURL + "place-notary-service-order";
    return this.http.post(path, notaryServiceOrderModel);
  }

  getNotaryOrderList(requestParamModel: Request) {
    const path = environment.appURL + "get-notary-order-list";
    return this.http.post(path, requestParamModel);
  }

  getNoratyOrderByInvoice(requestParamModel: Request) {
    const path = environment.appURL + "get-notary-order-by-invoice";
    return this.http.post(path, requestParamModel);
  }

  getNotaryDocuments(requestParamModel: Request) {
    const path = environment.appURL + "get-notary-doc-list";
    return this.http.post(path, requestParamModel);
  }

  updateNotaryOrderStatus(requestParamModel: Request) {
    const path = environment.appURL + "update-notary-order-status";
    return this.http.post(path, requestParamModel);
  }
}
