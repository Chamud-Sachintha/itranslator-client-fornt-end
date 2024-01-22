import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NotaryService } from 'src/app/services/notary/notary.service';
import { NotaryDocument } from 'src/app/shared/models/NotaryDocument/notary-document';
import { Request } from 'src/app/shared/models/Request/request';
import { environment } from 'src/environments/environment.development';

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
  notaryDocList: NotaryDocument[] = [];
  invoiceNo!: string;

  constructor(private activatedRoute: ActivatedRoute, private notaryService: NotaryService, private tostr: ToastrService) {}

  ngOnInit(): void {
    this.invoiceNo = this.activatedRoute.snapshot.params['invoiceNo'];

    this.loadNotaryOrderInfo();
    this.getTranslatedOrderDocs();
  }

  onClickUpdateOrderStatus(orderStatus: string) {
    this.requestParamModel.token = sessionStorage.getItem("authToken");
    this.requestParamModel.flag = sessionStorage.getItem("role");
    this.requestParamModel.invoiceNo = this.invoiceNo;
    this.requestParamModel.orderStatus = orderStatus;

    this.notaryService.updateNotaryOrderStatus(this.requestParamModel).subscribe((resp: any) => {

      if (resp.code === 1) {
        this.tostr.success("Update Order Status", "Order Status Updated Successfully.");
      } else {
        this.tostr.error("Update Order Status", resp.message);
      }
    })
  }

  onClickViewDocument(documentName: string) {
    const filePath = environment.fileServerURL + "notary_docs/" + documentName;
    window.open(filePath);
  }

  getTranslatedOrderDocs() {
    this.requestParamModel.token = sessionStorage.getItem("authToken");
    this.requestParamModel.flag = sessionStorage.getItem("role");
    this.requestParamModel.invoiceNo = this.invoiceNo;

    this.notaryService.getNotaryDocuments(this.requestParamModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        dataList.data[0].forEach((eachDoc: NotaryDocument) => {
          this.notaryDocList.push(eachDoc);
        })
      }
    })
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
