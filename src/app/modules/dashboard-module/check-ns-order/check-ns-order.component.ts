import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NotaryService } from 'src/app/services/notary/notary.service';
import { NotaryDocument } from 'src/app/shared/models/NotaryDocument/notary-document';
import { Request } from 'src/app/shared/models/Request/request';
import { environment } from 'src/environments/environment.development';
import { AdminMessage } from 'src/app/shared/models/AdminMessage/admin-message';
import { Subscription, switchMap, timer } from 'rxjs';

@Component({
  selector: 'app-check-ns-order',
  templateUrl: './check-ns-order.component.html',
  styleUrls: ['./check-ns-order.component.css']
})
export class CheckNsOrderComponent implements OnInit {
 


  requestParamModel = new Request();
  subscription!: Subscription;
  adminLessageList: AdminMessage[] = [];
  firstDocList: any[] = [];
  secondDocList: any[] = [];
  thirdDocList: any[] = [];
  allDocumentTypes: string[] = [
    'Plans',
    'Extracts',
    'Deeds / Certificates of Title'
  ]
  showDocuments: any[] = [];
  notaryDocList: NotaryDocument[] = [];
  totalOrderAmount!: number;
  bankSlip!: string;
  uploadedBankSlip = null;
  invoiceNo!: string;
  paymentStatus!: number;
  theselectperson:any[] = [];
  selectedPerson! : any;
  showpersondetails = false;
  showDocdetails = false;
  selectedImages: string[] = [];
  UserName: string | null = '';

  constructor(private activatedRoute: ActivatedRoute, private notaryService: NotaryService, private tostr: ToastrService) {}

  ngOnInit(): void {
    this.invoiceNo = this.activatedRoute.snapshot.params['invoiceNo'];

    this.loadNotaryOrderInfo();
    this.getTranslatedOrderDocs();
    this.UserName = sessionStorage.getItem("username");
    this.requestParamModel.token = sessionStorage.getItem("authToken");
    this.requestParamModel.flag = sessionStorage.getItem("role");

    this.subscription = timer(0, 6000).pipe(

      switchMap(() => this.notaryService.getOrderAdminMessageList(this.requestParamModel))

    ).subscribe((result: any) => {
      this.adminLessageList = [];
      const data = JSON.parse(JSON.stringify(result))

      data.data[0].forEach((eachData: AdminMessage) => {
        const formatedDate = parseInt(eachData.time) * 1000;
        eachData.time = formatedDate.toString();

        this.adminLessageList.push(eachData);
      })
    });
  }

  uploadBankSlip() {
    this.requestParamModel.token = sessionStorage.getItem("authToken");
    this.requestParamModel.flag = sessionStorage.getItem("role");
    this.requestParamModel.invoiceNo = this.invoiceNo;
    
    if (this.uploadedBankSlip != null) {
      this.convertImageToBase64(this.uploadedBankSlip).then((base64String) => {
        this.requestParamModel.bankSlip = base64String;
      }).then(() => {
        this.notaryService.submitBankSlip(this.requestParamModel).subscribe((resp: any) => {
          
          if (resp.code === 1) {
            this.tostr.success("Upload Bank Slip", "Bank Slip U[plpaded successfully");
          } else {
            this.tostr.error("Uplaod Bank Slip", resp.message);
          }
        })
      })
    }
  }

  onChangeBankSlip(event: any) {
    this.uploadedBankSlip = event.target.files[0];
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
    console.log('Downloading:', imageName);
  
   
    const filePath = environment.fileDocImageServerURL + "images/" + imageName;
    window.open(filePath, '_blank');
    /*const link = document.createElement('a');
    link.href = filePath;  
    link.download = imageName; 
    document.body.appendChild(link);  
    link.click();
    document.body.removeChild(link); */
  }

  onClickOpenDocTypeModel(index: number) {
    this.showDocuments = [];
    this.showDocdetails = true;
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
        console.log('sf>>>>>>>>>>>',this.firstDocList);
        this.secondDocList.push(dataList.data[0].secondDocType);
        this.thirdDocList.push(dataList.data[0].thirdDocType);
        this.theselectperson.push(dataList.data[0].notorypersonDocType);
        console.log(this.theselectperson);
        this.selectedPerson = this.theselectperson[0];
        this.totalOrderAmount = dataList.data[0].totalAmount;
        this.bankSlip = dataList.data[0].bankSlip;
        this.paymentStatus = dataList.data[0].paymentStatus;
      }
    })
  }

  convertImageToBase64(fileInput: any): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const file: File = fileInput;
      const reader: FileReader = new FileReader();

      reader.onloadend = () => {
        // The result attribute contains the base64 string
        const base64String: string = reader.result as string;
        resolve(base64String);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      // Read the image file as a Data URL
      reader.readAsDataURL(file);
    });
  }
  
  sendOrderMessageToAdmin(message: string) {
    this.requestParamModel.token = sessionStorage.getItem("authToken");
    this.requestParamModel.flag = sessionStorage.getItem("role");
    this.requestParamModel.message = message;
    this.requestParamModel.invoiceNo = this.invoiceNo;

    this.notaryService.sendOrderMessageToAdmin(this.requestParamModel).subscribe((resp: any) => {

      if (resp.code === 1) {
        
      }
    })
  }

  showDetails(person: any) {
    this.selectedPerson = person;
    this.showpersondetails = true;

    // Collect all images into an array
    this.selectedImages = [
      ...this.parseJson(person.drivingLicNo),
      ...this.parseJson(person.adultIdNumber),
      ...this.parseJson(person.bcNumber),
      ...this.parseJson(person.mcNumber),
      ...this.parseJson(person.nicNumber),
      ...this.parseJson(person.natureOfSignature),
    ].map(imageName => `${environment.fileDocImageServerURL}images/${imageName}`);

    console.log('Selected Images:', this.selectedImages);
  }

  closeModalp() {
    this.showpersondetails = false;
  }

  parseJson(jsonString: string): string[] {
    try {
      return jsonString ? JSON.parse(jsonString) : [];
    } catch (error) {
      console.error('Error parsing JSON:', jsonString, error);
      return [];
    }
  }

  closeModal() {
    this.showDocdetails = false;
  }
  

}
