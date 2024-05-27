import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Request } from 'src/app/shared/models/Request/request';
import { SearchParam } from 'src/app/shared/models/SearchParam/search-param';
import { environment } from 'src/environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class LegalService {

  constructor(private http: HttpClient) { }

  getLegalMessage(requestParamModel: Request) {
    const path = environment.appURL + "get-Legal-Request";
    return this.http.post(path, requestParamModel);
  }

  getCompleteLegalMessage(requestParamModel: Request) {
    const path = environment.appURL + "get-Complete-Legal-Request";
    return this.http.post(path, requestParamModel);
  }

  sendLegalMessageToAdmin(formDatass: FormData) {
    const path = environment.appURL + "send-Legal-Request";
    return this.http.post(path, formDatass);
  }

  getLMessageToAdmin(requestParamModel: Request) {
    const path = environment.appURL + "get-admin-Legal-Message";
    return this.http.post(path, requestParamModel);
  }

  sendAdminLegalMessage(formData:FormData){
    const path = environment.appURL + "send-Legal-Message";
    return this.http.post(path, formData);
  }

  getOrderDocList(requestModel: Request){
    const path = environment.appURL + "get-lgODoc-List";
    return this.http.post(path, requestModel);
  }

  getLegalAdviceDoc(requestModel: Request){
    const path = environment.appURL + "get-lgDoc-List";
    return this.http.post(path, requestModel);
  }

  ViewDoc(requestModel: Request){
    const path = environment.appURL + "view-lgDoc";
    return this.http.post(path, requestModel);
  }

  CompleteOrder(requestModel: Request){
    const path = environment.appURL + "Complete-legal-order";
    return this.http.post(path, requestModel);
  }
}
