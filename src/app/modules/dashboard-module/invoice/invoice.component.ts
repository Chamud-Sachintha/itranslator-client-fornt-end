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
        console.log(eachDoc)
        this.inviceTableObj.documentTitle = eachDoc.translationTitle;
        this.inviceTableObj.pages = eachDoc.pages;
        
        if (eachDoc.nicTranslateModel != 'undifined') {
          this.inviceTableObj.unitPrice = eachDoc.nicTranslateModel.price;
        }

        totalAmount += Number(this.inviceTableObj.unitPrice);

        this.invoiceItemList.push(this.inviceTableObj);
      })

      this.inviceTableObj.amount = totalAmount;
    })
  }

  getClientInfo() {

  }

}
