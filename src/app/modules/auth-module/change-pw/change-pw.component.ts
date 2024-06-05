import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ChangePw } from 'src/app/shared/models/ChangePw/change-pw';

@Component({
  selector: 'app-change-pw',
  templateUrl: './change-pw.component.html',
  styleUrls: ['./change-pw.component.css']
})
export class ChangePwComponent implements OnInit {

  changePasswordForm!: FormGroup;
  changePasswordInfoModel = new ChangePw();

  constructor(private formBuilder: FormBuilder, private tostr: ToastrService, private authService: AuthService
              , private router: Router) {}

  ngOnInit(): void {
    this.initChangePasswordForm()
  }

  submitChangePwForm() {
    const authCode = this.changePasswordForm.controls['authCode'].value;
    const newPassword = this.changePasswordForm.controls['newPw'].value;
    const confirmPassword = this.changePasswordForm.controls['confirmPw'].value;

    if (newPassword == "" || confirmPassword == "" || authCode == "") {
      this.tostr.error("Change Account Password", "Please Enter All Fields.");
    } else if (newPassword !== confirmPassword) {
      this.tostr.error("Change Account Password", "Password Doesnt Match.");
    } else {
      this.changePasswordInfoModel.authCode = authCode;
      this.changePasswordInfoModel.newPassword = newPassword;
      
      this.authService.changeClientPassword(this.changePasswordInfoModel).subscribe((resp: any) => {
        if (resp.code === 1) {
          this.tostr.success("Change Account Password", "Password Changed Successfully");
          this.router.navigate(['/auth/login']);
        } else {
          this.tostr.error("Change Account Password", resp.message);
        }
      })
    }
  }

  initChangePasswordForm() {
    this.changePasswordForm = this.formBuilder.group({
      authCode: ['', Validators.required],
      newPw: ['', Validators.required],
      confirmPw: ['', Validators.required]
    })
  }

}
