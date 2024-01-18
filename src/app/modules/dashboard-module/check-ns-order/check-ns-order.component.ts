import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotaryService } from 'src/app/services/notary/notary.service';
import { Request } from 'src/app/shared/models/Request/request';

@Component({
  selector: 'app-check-ns-order',
  templateUrl: './check-ns-order.component.html',
  styleUrls: ['./check-ns-order.component.css']
})
export class CheckNsOrderComponent implements OnInit {

  requestParamModel = new Request();
  firstDocList: any[] = [];
  secondDocList: any[] = [];
  thirdDocList: any[] = [];
  allDocumentTypes: string[] = [
    'NIC / Passport / Driving License / Adult Identity Card',
    'Extracts',
    'Deeds / Certificates of Title'
  ]
  showDocuments: any[] = [];
  invoiceNo!: string;

  constructor(private activatedRoute: ActivatedRoute, private notaryService: NotaryService) {}

  ngOnInit(): void {
    this.invoiceNo = this.activatedRoute.snapshot.params['invoiceNo'];

    this.loadNotaryOrderInfo();
  }

  onClickViewImage(imageName: string) {

  }

  onClickOpenDocTypeModel(index: number) {
    this.showDocuments = [];

    if (index == 1) {
      this.showDocuments.push(this.firstDocList[0]);
    } else if (index == 2) {
      this.showDocuments = this.secondDocList;
    } else {
      this.showDocuments = this.thirdDocList;
    }

    console.log(this.showDocuments)
  }

  loadNotaryOrderInfo() {
    this.requestParamModel.token = sessionStorage.getItem("authToken");
    this.requestParamModel.flag = sessionStorage.getItem("role");
    this.requestParamModel.invoiceNo = this.invoiceNo;

    this.notaryService.getNoratyOrderByInvoice(this.requestParamModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        this.firstDocList.push(dataList.data[0].firstDocType)
        this.secondDocList.push(dataList.data[0].secondDocType)
        this.thirdDocList.push(dataList.data[0].thirdDocType)
      }
    })
  }

}
