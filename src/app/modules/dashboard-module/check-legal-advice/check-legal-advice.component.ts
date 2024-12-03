import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subscription, switchMap, timer } from 'rxjs';
import { LegalService } from 'src/app/services/legal/legal.service';
import { AdminMessage } from 'src/app/shared/models/AdminMessage/admin-message';
import { OrderRequest } from 'src/app/shared/models/OrderRequest/order-request';
import { Request } from 'src/app/shared/models/Request/request';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-check-legal-advice',
  templateUrl: './check-legal-advice.component.html',
  styleUrls: ['./check-legal-advice.component.css']
})
export class CheckLegalAdviceComponent implements OnInit{
  orderRequestsList: any[] = [];
  requestParamModel = new Request();
  isVisible: boolean = false;
  adminLessageList: any[] = [];
  lgForm!: FormGroup;
  subscription !: Subscription;
  legalAdvice: any[] = [];
  legalAdvice2: any[] = [];
  combinedFiles: string[] = [];
  combinedData: any[] = [];
  intervalId: any;
  UserName: string | null = '';

  constructor(
    private formBuilder: FormBuilder,
    private legalService: LegalService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.lgForm = this.fb.group({
      message: [''],
      Doc: [null]
    });
    
    this.getlegalAdvice();
    this.UserName = sessionStorage.getItem("username");
   
    
  }

  onClickCheckOrder(OrderNo: string) {
    this.requestParamModel.token = sessionStorage.getItem("authToken") || '';
    this.requestParamModel.flag = sessionStorage.getItem("role") || '';
    this.requestParamModel.OrderNo = OrderNo;
    this.adminLessageList = [];
    this.legalService.getLMessageToAdmin(this.requestParamModel).subscribe((resp: any) => {
      if (resp.code === 1) {
        const dataList = JSON.parse(JSON.stringify(resp));
        if (resp.code === 1) {
          dataList.data[0].forEach((eachRow: OrderRequest) => {
            const formatedDate = eachRow.createTime * 1000;
            eachRow.createTime = formatedDate;
            this.adminLessageList.push(eachRow);
          });
        }
      } else {
        this.toastr.error("Place Legal Advice", resp.message);
      }
    });
    this.isVisible = true;
  }

  getlegalAdvice() {
    this.spinner.show();
    this.requestParamModel.token = sessionStorage.getItem("authToken") || '';
    this.requestParamModel.flag = sessionStorage.getItem("role") || '';
    this.legalService.getLegalMessage(this.requestParamModel).subscribe((resp: any) => {
      if (resp.code === 1) {
        const dataList = JSON.parse(JSON.stringify(resp));
        if (resp.code === 1) {
          this.spinner.hide();
          dataList.data[0].forEach((eachRow: OrderRequest) => {
            const formatedDate = eachRow.createTime * 1000;
            eachRow.createTime = formatedDate;
            this.orderRequestsList.push(eachRow);
          });
        }
      } else {
        this.toastr.error("Place Legal Advice", resp.message);
      }
    });
  }

  onSubmitAddPersonForm() {
    // Add your form submission logic here
  }

  sendOrderMessageToAdmin() {
    if (this.lgForm.invalid) {
      this.toastr.error('Please fill in the message and attach files if necessary.');
      return;
    }

    const formData = new FormData();
    formData.append('token', sessionStorage.getItem("authToken") || '');
    formData.append('flag', sessionStorage.getItem("role") || '');
    formData.append('OrderNo', this.requestParamModel.OrderNo || '');
    formData.append('message', this.lgForm.get('message')?.value);

    const files: File[] = this.lgForm.get('Doc')?.value || [];
    files.forEach((file, index) => {
      formData.append(`Doc[${index}]`, file);
    });
    this.spinner.show();
    this.legalService.sendAdminLegalMessage(formData).subscribe((resp: any) => {
      if (resp.code === 1) {
        this.spinner.hide();
        this.toastr.success("Send Admin Message", "Message Sent Successfully.");
       // this.tostr.success("Order Assign", "Order Assign Successfully.");
        this.isVisible = false;
       
        this.lgForm.reset();
        this.adminLessageList.push({
          fromUser: 'You',
          time: new Date(),
          message: formData.get('message')
        });
      } else {
        this.toastr.error("Send Admin Message", resp.message);
      }
    }, () => {
      this.toastr.error("Send Admin Message", "An error occurred while sending the message.");
    });
  }

  onChangeSecondDoc($event: any) {
    const files = $event.target.files;
    if (this.lgForm && files) { 
      this.lgForm.get('Doc')?.setValue(Array.from(files)); 
    }
  }


  getdocModal(order: string){
    this.isVisible = true;
    this.requestParamModel.token = sessionStorage.getItem("authToken");
    this.requestParamModel.flag = sessionStorage.getItem("role");
    this.requestParamModel.OrderNo = order;


    this.subscription = timer(0, 20000).pipe(
      switchMap(() => this.legalService.getOrderDocList(this.requestParamModel))
    ).subscribe((result: any) => {
      this.legalAdvice = result.data[0]; 
        console.log('fileservices',this.legalAdvice);
      this.legalService.getLegalAdviceDoc(this.requestParamModel).subscribe((resp: any) => {
        this.legalAdvice2 = resp.data[0];
        console.log('filesorder',this.legalAdvice2);
        
        this.combineData();
      });
    });

   
  }

  combineData() {
    try {
     
      const combinedArray = [...this.legalAdvice, ...this.legalAdvice2];
      const parsedData = combinedArray.flatMap((item: string) => {
        try {
         
          return item && JSON.parse(item);
        } catch (error) {
         
          console.error('Error parsing item:', item, error);
          return [];
        }
      });
  
      
      this.combinedData = parsedData;
      console.log('combinedData', this.combinedData);
    } catch (error) {
      console.error('Error combining data:', error);
    }
  }

    openFile(document: string) {

    this.requestParamModel.token = sessionStorage.getItem("authToken");
    this.requestParamModel.flag = sessionStorage.getItem("role");
    this.requestParamModel.DocName =document;
   
    this.legalService.ViewDoc(this.requestParamModel).subscribe((resp: any) => {
      console.log('data>>>', resp.code);
      if(resp.code){
        const imageUrl2 = environment.fileDocServerURL + document;
        window.open(imageUrl2);
      }
      else{
        const imageUrl1 = environment.fileDoc2ServerURL + document;
        window.open(imageUrl1);
      }

      });
    
    }
  
    onClickComplteOrder(order: string){

    this.requestParamModel.token = sessionStorage.getItem("authToken");
    this.requestParamModel.flag = sessionStorage.getItem("role");
    this.requestParamModel.OrderNo = order;
      this.legalService.CompleteOrder(this.requestParamModel).subscribe((resp: any) => {
        if (resp.code === 1) {
          this.toastr.success("Legal Service", "Order Complete Successfully.");
          this.getlegalAdvice();
          window.location.reload();
         
        } else {
          this.toastr.error("Legal Service", resp.message);
        }
      });
    }


}
