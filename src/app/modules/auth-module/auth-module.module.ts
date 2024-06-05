import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthModuleRoutingModule } from './auth-module-routing.module';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SmsAuthenticationComponent } from './sms-authentication/sms-authentication.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ForgotPasswordAuthenticationComponent } from './forgot-password-authentication/forgot-password-authentication.component';
import { ChangePwComponent } from './change-pw/change-pw.component';


@NgModule({
  declarations: [
    SigninComponent,
    SignupComponent,
    SmsAuthenticationComponent,
    ForgotPasswordComponent,
    ForgotPasswordAuthenticationComponent,
    ChangePwComponent
  ],
  imports: [
    CommonModule,
    AuthModuleRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ]
})
export class AuthModuleModule { }
