import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {

  public componentValueObj = new BehaviorSubject<any>([]);

  constructor() { }

  setComponentValueObj(data: any) {
    this.componentValueObj.next(data);
  }

  getComponentValueObj() {
    return this.componentValueObj.asObservable();
  }
}
