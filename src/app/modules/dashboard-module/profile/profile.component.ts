import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subscription, switchMap, timer } from 'rxjs';
import { LegalService } from 'src/app/services/legal/legal.service';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { AdminMessage } from 'src/app/shared/models/AdminMessage/admin-message';
import { OrderRequest } from 'src/app/shared/models/OrderRequest/order-request';
import { Request } from 'src/app/shared/models/Request/request';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})





export class ProfileComponent {
  UserName: string | null = '';
  Email: string | null = '';
  NIC: string | null = '';
  Address: string | null = '';
  Phone: string | null = '';
  birthday: Date | null = null;
  requestParamModel = new Request();
  formattedDate!: string;
  editProfileForm!: FormGroup;

  LegalCount!: string;
  TranslationCount!: string ;
  NotaryCount!: string;
  CSCount!: string;
  newPassword: string = '';

  

  

  constructor(
    private formBuilder: FormBuilder,
    private ProfileService: ProfileService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.getProfileData();
    this. getordersdetails();
    this.editProfileForm = this.formBuilder.group({
      UserName: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      NIC: ['', Validators.required],
      Address: ['', Validators.required],
      Phone: ['', Validators.required],
      Birthday: ['', Validators.required]
    });
    }

    onSubmit(): void {
      if (this.editProfileForm.invalid) {
        
        return;
      }
      
      const formData = {
       ...this.editProfileForm.value,
        token: sessionStorage.getItem("authToken") || '',
        flag: sessionStorage.getItem("role") || ''
      };
      this.updateProfile(formData);
     
     
      console.log(formData); 
    }
  

    getProfileData() {
     
      this.requestParamModel.token = sessionStorage.getItem("authToken") || '';
      this.requestParamModel.flag = sessionStorage.getItem("role") || '';

       this.ProfileService.getProfileInfo(this.requestParamModel).subscribe((resp: any) => {
      if (resp.code === 1) {
        const dataList = JSON.parse(JSON.stringify(resp));
        if (resp.code === 1) {
          console.log( resp)
         
          this.UserName = resp.data[0].full_name;
          this.Email = resp.data[0].email;
          this.NIC = resp.data[0].nic_number;
          this.Address = resp.data[0].address;
          this.Phone = resp.data[0].mobile_number;
          this.birthday = new Date(resp.data[0].bdate * 1000);
          //const sbirthday = new Date(this.birthday );
          this.formattedDate = `${this.birthday.getDate()}/${this.birthday.getMonth() + 1}/${this.birthday.getFullYear()}`;


          this.editProfileForm.patchValue({
            UserName: this.UserName,
            Email: this.Email,
            NIC: this.NIC,
            Address: this.Address,
            Phone: this.Phone,
            Birthday:this.birthday.toISOString().split('T')[0]
          });
       
        }
      } else {
        this.toastr.error("Place Legal Advice", resp.message);
      }
    });
    }

    getordersdetails(){
      this.requestParamModel.token = sessionStorage.getItem("authToken") || '';
      this.requestParamModel.flag = sessionStorage.getItem("role") || '';
      this.ProfileService.getOrders(this.requestParamModel).subscribe((resp: any) => {
        if (resp.code === 1) {
          console.log(resp)

          this.LegalCount = resp.data[0].LegalCount;
          this.TranslationCount = resp.data[0].TransCount;
          this.NotaryCount = resp.data[0].NotaryCount;
          this.CSCount = resp.data[0].CSCount;
          
          } else {
            this.toastr.error("Place Legal Advice", resp.message);
            }
    });

  }

  editProfile(){
    console.log()
  }




        updateProfile(formData: any) {
          this.spinner.show();

          

          this.ProfileService.updateProfile(formData).subscribe((data) => {
            console.log(data)
            
              this.toastr.success('Profile Updated Successfully', 'Success');
              window.location.reload();
              this.getProfileData();
             this. getordersdetails();
            
            this.spinner.hide();
          }, (error) => {
            this.toastr.error('Failed to update profile', 'Error');
            this.spinner.hide();
          });
        }
             
        

      
       
        submitResetPassword() {
          if (!this.newPassword) {
            this.toastr.error('Please enter a new password.', 'Error');
            return;
          }
          this.requestParamModel.token = sessionStorage.getItem("authToken") || '';
          this.requestParamModel.flag = sessionStorage.getItem("role") || '';
          this.requestParamModel.newpass = this.newPassword ;

          this.ProfileService.resetPassword(this.requestParamModel).subscribe(
            (data) => {
              this.toastr.success('Password updated successfully.', 'Success');
            this.spinner.hide();
            window.location.reload();
            },
            (error) => {
              this.toastr.error('Failed to update password.', 'Error');
            }
          );
        }
       



}
