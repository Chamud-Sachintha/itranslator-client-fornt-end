import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) {}

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

    } else if (emailAddress == "") {

    } else if (nicNumber == "") {

    } else if (address == "") {

    } else if (mobileNumber == "") {

    } else if (birthDate == "") {

    } else if (password == "") {

    } else if (confPassword == "") {

    } else {
      this.clientModel.fullName = fullName;
      this.clientModel.emailAddress = emailAddress;
      this.clientModel.nicNumber = nicNumber;
      this.clientModel.address = address;
      this.clientModel.mobileNumber = mobileNumber;
      this.clientModel.birthDate = birthDate;
      this.clientModel.mobileNumber = mobileNumber;
      this.clientModel.password = password;

      this.authService.registerUser(this.clientModel).subscribe((resp: any) => {

        if (resp.code === 1) {
          console.log(resp);
        }
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
