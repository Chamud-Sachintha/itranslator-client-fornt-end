import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Request } from 'src/app/shared/models/Request/request';
import { SearchParam } from 'src/app/shared/models/SearchParam/search-param';
import { Service } from 'src/app/shared/models/service/service';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  addNewService(serviceModel: Service) {
    const path = environment.appURL + "add-service";
    return this.http.post(path, serviceModel);
  }

  getServiceList(requestModel: Request) {
    const path = environment.appURL + "get-service-list";
    return this.http.post(path, requestModel);
  }

  getServicePriceByDeliveryTime(searchParamModel: SearchParam) {
    const path = environment.appURL + "get-service-price-by-delivery-time";
    return this.http.post(path, searchParamModel);
  }
}
