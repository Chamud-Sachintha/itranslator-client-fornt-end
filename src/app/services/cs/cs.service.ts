import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Request } from 'src/app/shared/models/Request/request';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CsService {

  constructor(private http: HttpClient) { }

  placeCsOrder(formData: FormData) {
    const path = environment.appURL + "place-cs-order";
    return this.http.post(path, formData);
  }

  getCSOrderList(requestParamModel: Request) {
    const path = environment.appURL + "get-cs-order-requests";
    return this.http.post(path, requestParamModel);
  }

  getCompeteCSOrderList(requestParamModel: Request) {
    const path = environment.appURL + "get-complete-cs-order-requests";
    return this.http.post(path, requestParamModel);
  }
}
