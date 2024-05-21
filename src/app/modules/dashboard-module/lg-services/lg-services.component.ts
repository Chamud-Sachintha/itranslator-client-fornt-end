import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LegalService } from 'src/app/services/legal/legal.service';
import { AdminMessage } from 'src/app/shared/models/AdminMessage/admin-message';
import { Request } from 'src/app/shared/models/Request/request';

@Component({
  selector: 'app-lg-services',
  templateUrl: './lg-services.component.html',
  styleUrls: ['./lg-services.component.css']
})
export class LgServicesComponent implements OnInit {

  requestParamModel = new Request();
  adminLessageList: AdminMessage[] = [];
  AddtionalDoc: File[] = [];
  AdditionalFiless: File[] = []; 
  DescriptionData!: string;
  AdditionalFiles: string[] = [];
  AdditionalFilesdDocList: any[] = [];
  secondServiceDocs: any[] = [];
  thirdServiceDocList: any[] = [];
  thirdServiceIntentLetter: any;
  forthServiceDocList: any[] = [];
  forthServiceResignLetter: any;
  fifthServiceDocList: any[] = [];
  sixthServiceDocList: any[] = [];
  seventhServiceDocList: any[] = [];

  lgForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private legalService: LegalService, private toastr: ToastrService, private router: Router) {
    this.lgForm = this.formBuilder.group({
      DescriptionData: ['', Validators.required],
      Doc: ['',] 
    });
  }

  ngOnInit(): void {
    
  }

  

 

  convertImageToBase64(fileInput: any): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const file: File = fileInput;
      const reader: FileReader = new FileReader();

      reader.onloadend = () => {
        
        const base64String: string = reader.result as string;
        resolve(base64String);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      
      reader.readAsDataURL(file);
    });
  }

  onClickSendLGDetails() {
    const Message = this.lgForm.controls['DescriptionData'].value;
    if (this.lgForm && this.lgForm.valid) {
        const formDatass = new FormData();
        const token: any = sessionStorage.getItem("authToken");
        const flag: any = sessionStorage.getItem("role");

        if (token && flag) { // Check if token and flag are not null
          formDatass.append("token", token);
          formDatass.append("flag", flag);
          formDatass.append("message", Message);

            const files: FileList | null = this.lgForm.get('Doc')?.value;

            if (files) {
                for (let i = 0; i < files.length; i++) {
                  formDatass.append('LegalDoc[]', files[i]);
                }
            } else {
                console.error('No files selected');
            }

            this.legalService.sendLegalMessageToAdmin(formDatass).subscribe((resp: any) => {
                if (resp.code === 1) {
                    this.toastr.success("Place Legal Advice", " Placed Successfully");
                    this.router.navigate(['app/select-services/step-01']);
                    this.lgForm.reset();
                } else {
                    this.toastr.error("Place Legal Advice", resp.message);
                }
            });
        } else {
            console.error('Token or flag is null'); // Handle this case appropriately
        }
    } else {
        this.toastr.error('Please fill in all required fields.');
    }
}








onChangeSecondDoc($event: any) {
  const files = $event.target.files;
  if (this.lgForm && files) { // Perform null check on this.lgForm
      this.lgForm.get('Doc')?.setValue(Array.from(files)); // Use safe navigation operator
  }
}






}
