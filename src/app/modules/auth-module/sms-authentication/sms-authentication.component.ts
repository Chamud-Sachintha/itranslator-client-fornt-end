import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SmsService } from 'src/app/services/sms/sms.service';
import { SMSModel } from 'src/app/shared/models/SMSModel/smsmodel';

@Component({
  selector: 'app-sms-authentication',
  templateUrl: './sms-authentication.component.html',
  styleUrls: ['./sms-authentication.component.css']
})
export class SmsAuthenticationComponent implements OnInit {

  smsInfoModel = new SMSModel();

  constructor( private tostr: ToastrService, private smsService: SmsService, private router: Router) {}

  ngOnInit(): void {
    
  }

  onChangeFirstDigit($event: any) {
    const value = $event.target.value;

    if (value != "") {
      document.getElementById("secondDigit")?.focus();
    }
  }

  onChangeSecondDigit($event: any) {
    const value = $event.target.value;

    if (value != "") {
      document.getElementById("thirdDigit")?.focus();
    }
  }

  onChangeThirdDigit($event: any) {
    const value = $event.target.value;

    if (value != "") {
      document.getElementById("fourthDigit")?.focus();
    }
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

      this.smsService.verifyRegisterCodeSms(this.smsInfoModel).subscribe((resp: any) => {
        if (resp.code === 1) {
          this.tostr.success("Account Activation.", "Account Activation Succcessfully.");
          this.router.navigate(['/auth/login'])
        } else {
          this.tostr.error("Account Activation", resp.message);
        }
      })
    }
  }

}
