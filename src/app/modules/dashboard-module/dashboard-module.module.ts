import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardModuleRoutingModule } from './dashboard-module-routing.module';
import { HomeComponent } from './home/home.component';
import { SelectRequiredDocsComponent } from './select-required-docs/select-required-docs.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { MainServicesComponent } from './main-services/main-services.component';
import { SelectServicesComponent } from './select-services/select-services.component';
import { UploadRequiredDocsComponent } from './upload-required-docs/upload-required-docs.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderRequestsComponent } from './order-requests/order-requests.component';
import { CheckOrderComponent } from './check-order/check-order.component';
import { ProfileComponent } from './profile/profile.component';
import { NotaryServiceComponent } from './notary-service/notary-service.component';
import { NotaryServiceStep01Component } from './notary-service-step-01/notary-service-step-01.component';
import { NotaryServiceStep02Component } from './notary-service-step-02/notary-service-step-02.component';
import { NotaryServiceStep03Component } from './notary-service-step-03/notary-service-step-03.component';


@NgModule({
  declarations: [
    HomeComponent,
    SelectRequiredDocsComponent,
    InvoiceComponent,
    MainServicesComponent,
    SelectServicesComponent,
    UploadRequiredDocsComponent,
    OrderRequestsComponent,
    CheckOrderComponent,
    ProfileComponent,
    NotaryServiceComponent,
    NotaryServiceStep01Component,
    NotaryServiceStep02Component,
    NotaryServiceStep03Component,
  ],
  imports: [
    CommonModule,
    DashboardModuleRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DashboardModuleModule { }
