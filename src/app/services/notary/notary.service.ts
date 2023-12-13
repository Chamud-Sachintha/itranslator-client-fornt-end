import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
}
