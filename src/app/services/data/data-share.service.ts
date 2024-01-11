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

  generateInvoiceNo(type: string, length = 10) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }

    const fullInvoiceNo = type + "-" + result;
    return fullInvoiceNo;
  }
}
