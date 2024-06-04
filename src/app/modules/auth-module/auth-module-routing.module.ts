import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { SmsAuthenticationComponent } from './sms-authentication/sms-authentication.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    children: [
      {
        path: '',
        component: SigninComponent
      }
    ]
  },

  {
    path: 'register',
    children: [
      {
        path: '',
        component: SignupComponent
      }
    ]
  },

  {
    path: 'sms',
    children: [
      {
        path: '',
        component: SmsAuthenticationComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthModuleRoutingModule { }
