import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthModuleRoutingModule } from './auth-module-routing.module';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SmsAuthenticationComponent } from './sms-authentication/sms-authentication.component';


@NgModule({
  declarations: [
    SigninComponent,
    SignupComponent,
    SmsAuthenticationComponent
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
