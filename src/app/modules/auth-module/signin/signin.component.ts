import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Auth } from 'src/app/shared/models/Auth/auth';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  authModel = new Auth();
  userAuthForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService, private tostr: ToastrService
              , private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    if (sessionStorage.getItem("authToken") != null) {
      this.router.navigate(['/home']);
    }
    this.initCreateSigninForm();
  }

  onSubmitUserAuthForm() {
    const username = this.userAuthForm.controls['username'].value;
    const password = this.userAuthForm.controls['password'].value;
    const flag = this.userAuthForm.controls['flag'].value;

    if (username == "") {
      this.tostr.error("Empty Feilds Found", "Username is Required.");
    } else if (password == "") {
      this.tostr.error("Empty Feilds Found", "Password is required.");
    } else {
      this.authModel.username = username;
      this.authModel.password = password;
      this.authModel.flag = flag;

      this.spinner.show();
      this.authService.authenticateUser(this.authModel).subscribe((resp: any) => {

        const dataList = JSON.parse(JSON.stringify(resp));

        if (resp.code === 1) {
          sessionStorage.setItem("authToken", dataList.token);
          sessionStorage.setItem("email", dataList.data[0].email);
          sessionStorage.setItem("role", dataList.data[0].userRole);
          sessionStorage.setItem("username", username);

          this.tostr.success("Client Login", "Client Authentication Successfully.");

          this.router.navigate(['app'])
        } else {
          this.tostr.error("Authenticate User", resp.message);
        }

        this.spinner.hide();
      }, (err) => {})
    }
  }

  initCreateSigninForm() {
    this.userAuthForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      flag: ['', Validators.required]
    })
  }

}
