import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Client } from 'src/app/shared/models/Client/client';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  clientModel = new Client();
  cretateSignUpForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService, private tostr: ToastrService
              , private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.initCreateSignUpForm();
  }

  onSubmitSignUpForm() {
    const fullName = this.cretateSignUpForm.controls['fullName'].value;
    const emailAddress = this.cretateSignUpForm.controls['email'].value;
    const nicNumber = this.cretateSignUpForm.controls['nicNumber'].value;
    const address = this.cretateSignUpForm.controls['address'].value;
    const mobileNumber = this.cretateSignUpForm.controls['mobileNumber'].value;
    const birthDate = this.cretateSignUpForm.controls['birthDate'].value;
    const password = this.cretateSignUpForm.controls['password'].value;
    const confPassword = this.cretateSignUpForm.controls['confPassword'].value;

    if (fullName == "") {
      this.tostr.error("Empty Feilds Found", "Full Name is required.");
    } else if (emailAddress == "") {
      this.tostr.error("Empty Feilds Found", "Email Address is required.");
    } else if (nicNumber == "") {
      this.tostr.error("Empty Feilds Found", "NIC Number is required.");
    } else if (address == "") {
      this.tostr.error("Empty Feilds Found", "Address is required.");
    } else if (mobileNumber == "") {
      this.tostr.error("Empty Feilds Found", "Mobile number is required.");
    } else if (birthDate == "") {
      this.tostr.error("Empty Feilds Found", "BirthDate is required.");
    } else if (password == "") {
      this.tostr.error("Empty Feilds Found", "Password is required.");
    } else if (confPassword == "") {
      this.tostr.error("Empty Feilds Found", "Passwqord Confirm is required.");
    } else {
      this.clientModel.fullName = fullName;
      this.clientModel.emailAddress = emailAddress;
      this.clientModel.nicNumber = nicNumber;
      this.clientModel.address = address;
      this.clientModel.mobileNumber = mobileNumber;
      this.clientModel.birthDate = birthDate;
      this.clientModel.mobileNumber = mobileNumber;
      this.clientModel.password = password;

      this.spinner.show();
      this.authService.registerUser(this.clientModel).subscribe((resp: any) => {

        if (resp.code === 1) {
          this.tostr.success("New Client Registration", "Client Registration Succcessfully.");
          this.router.navigate(['/auth/login']);
        } else {
          this.tostr.error("New Client Registration", resp.message);
        }

        this.spinner.hide();
      }, (err) => {})
    }
  }

  initCreateSignUpForm() {
    this.cretateSignUpForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', Validators.required],
      nicNumber: ['', Validators.required],
      address: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      birthDate: ['', Validators.required],
      password: ['', Validators.required],
      confPassword: ['', Validators.required]
    })
  }

}
