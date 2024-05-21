import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LegalService } from 'src/app/services/legal/legal.service';
import { AdminMessage } from 'src/app/shared/models/AdminMessage/admin-message';
import { OrderRequest } from 'src/app/shared/models/OrderRequest/order-request';
import { Request } from 'src/app/shared/models/Request/request';

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

  constructor(
    private formBuilder: FormBuilder,
    private legalService: LegalService,
    private toastr: ToastrService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.lgForm = this.fb.group({
      message: [''],
      Doc: [null]
    });
    
    this.getlegalAdvice();
    
  }

  onClickCheckOrder(OrderNo: string) {
    this.requestParamModel.token = sessionStorage.getItem("authToken") || '';
    this.requestParamModel.flag = sessionStorage.getItem("role") || '';
    this.requestParamModel.OrderNo = OrderNo;

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
    this.requestParamModel.token = sessionStorage.getItem("authToken") || '';
    this.requestParamModel.flag = sessionStorage.getItem("role") || '';
    this.legalService.getLegalMessage(this.requestParamModel).subscribe((resp: any) => {
      if (resp.code === 1) {
        const dataList = JSON.parse(JSON.stringify(resp));
        if (resp.code === 1) {
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

    this.legalService.sendAdminLegalMessage(formData).subscribe((resp: any) => {
      if (resp.code === 1) {
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
}
