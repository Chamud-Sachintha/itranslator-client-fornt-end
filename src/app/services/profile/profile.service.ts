import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Order } from 'src/app/shared/models/Order/order';
import { Request } from 'src/app/shared/models/Request/request';
import { SearchParam } from 'src/app/shared/models/SearchParam/search-param';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  getProfileInfo(requestParamModel: Request) {
    const path = environment.appURL + "get-profile-details";
    return this.http.post(path, requestParamModel);
  }

  getOrders(requestParamModel: Request) {
    const path = environment.appURL + "get-orders-details";
    return this.http.post(path, requestParamModel);
  }
  updateProfile(profileData: any){
    const path = environment.appURL + "update-profile";
    return this.http.post(path, profileData);
  }

  resetPassword(requestParamModel: Request){
    const path = environment.appURL + "prfile-resetPassword";
    return this.http.post(path, requestParamModel);
  }
}
