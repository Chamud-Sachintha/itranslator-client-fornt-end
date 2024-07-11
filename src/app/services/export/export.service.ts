import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from 'src/app/shared/models/Order/order';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor(private http: HttpClient) { }

  exportInvoiceAsPDF(invoiceObjModel: Order) {
    const path = environment.appURL + "export-as-pdf";
    return this.http.post(path, invoiceObjModel, { responseType: 'blob' });
  }
}
