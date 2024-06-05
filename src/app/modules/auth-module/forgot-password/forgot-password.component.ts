import { group } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SmsService } from 'src/app/services/sms/sms.service';
import { SMSModel } from 'src/app/shared/models/SMSModel/smsmodel';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  smsInfoModel = new SMSModel();
  forgotPwForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private toatr: ToastrService, private smsService: SmsService
            , private router: Router) {}

  ngOnInit(): void {
    this.initForgotPwForm();
  }

  initForgotPwForm() {
    this.forgotPwForm = this.formBuilder.group({
      mobileNumber: ['', Validators.required]
    })
  }

  onSubmitForgotPwForm() {
    const mobileNumber = this.forgotPwForm.controls['mobileNumber'].value;

    if (mobileNumber == "") {
      this.toatr.error("Empty Fields Found", "Please Enter Mobile Number");
    } else {
      this.smsInfoModel.mobileNumber = mobileNumber;

      this.smsService.sendForgotSmsVerifyCode(this.smsInfoModel).subscribe((resp: any) => {
        if (resp.code === 1) {
          this.router.navigate(['/auth/change-pw'])
          this.toatr.success("Forgot Account Password.", "Verification Code Sent Successfully.");
        } else {
          this.toatr.error("Forgot Account Password.", resp.message);
        }
      })
    }
  }

}
