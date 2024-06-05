import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SmsService } from 'src/app/services/sms/sms.service';
import { SMSModel } from 'src/app/shared/models/SMSModel/smsmodel';

@Component({
  selector: 'app-forgot-password-authentication',
  templateUrl: './forgot-password-authentication.component.html',
  styleUrls: ['./forgot-password-authentication.component.css']
})
export class ForgotPasswordAuthenticationComponent implements OnInit {

  smsInfoModel = new SMSModel();

  constructor(private smsService: SmsService, private tostr: ToastrService) {}

  ngOnInit(): void {
    
  }

  submitVerifyCode() {
    const firstDigit: any = document.getElementById("firstDigit");
    const secondDigit: any = document.getElementById("secondDigit");
    const thirdDigit: any = document.getElementById("thirdDigit");
    const fourthDigit: any = document.getElementById("fourthDigit");

    console.log(firstDigit.value == "");

    if (firstDigit.value == "" || secondDigit.value == "" || thirdDigit.value == "" || fourthDigit.value == "") {
      this.tostr.error("Verify Register Code", "Please Enter Verification Code");
    } else {
      let verifyCode = firstDigit.value + secondDigit.value + thirdDigit.value + fourthDigit.value;
      this.smsInfoModel.verifyCode = verifyCode;

      this.smsService.verifyForgotPwCode(this.smsInfoModel).subscribe((resp: any) => {
        if (resp.code === 1) {
          
        } else {

        }
      })
    }
  }

}
