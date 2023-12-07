import { Component, OnInit } from '@angular/core';
import { DataShareService } from 'src/app/services/data/data-share.service';
import { InvoiceTable } from 'src/app/shared/models/InvoiceTable/invoice-table';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  invoiceItemList: InvoiceTable[] = [];
  inviceTableObj = new InvoiceTable();

  constructor(private dataShareService: DataShareService) {}

  ngOnInit(): void {

    this.getClientInfo();

    this.dataShareService.getComponentValueObj().subscribe((data: any) => {
      const dataList = JSON.parse(JSON.stringify(data));

      let totalAmount = 0;
      dataList.uploadedDocList.forEach((eachDoc: any) => {
        
        let invoiceObj = new InvoiceTable();

        invoiceObj.documentTitle = eachDoc.translationTitle;
        invoiceObj.pages = eachDoc.pages;
        
        if (eachDoc.nicTranslateModel !== undefined) {
          invoiceObj.unitPrice = eachDoc.nicTranslateModel.price;
        } else if (eachDoc.bcTranslateModel !== undefined) {
          invoiceObj.unitPrice = eachDoc.bcTranslateModel.price;
        }

        totalAmount += Number(invoiceObj.unitPrice);

        this.invoiceItemList.push(invoiceObj);
      })

      this.inviceTableObj.amount = totalAmount;
    })
  }

  getClientInfo() {

  }

}
