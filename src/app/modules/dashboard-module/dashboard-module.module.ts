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
import { ProfileComponent } from './profile/profile.component';
import { NotaryServiceComponent } from './notary-service/notary-service.component';
import { NotaryServiceStep01Component } from './notary-service-step-01/notary-service-step-01.component';
import { NotaryServiceStep02Component } from './notary-service-step-02/notary-service-step-02.component';
import { NotaryServiceStep03Component } from './notary-service-step-03/notary-service-step-03.component';
import { NotaryOrderRequestsComponent } from './notary-order-requests/notary-order-requests.component';
import { CheckTrOrderComponent } from './check-tr-order/check-tr-order.component';
import { CheckNsOrderComponent } from './check-ns-order/check-ns-order.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CompleteTrOrdersComponent } from './complete-tr-orders/complete-tr-orders.component';
import { CsServiceComponent } from './cs-service/cs-service.component';
import { CsServiceSubmitDetailsComponent } from './cs-service-submit-details/cs-service-submit-details.component';
import { CsOrderRequestsComponent } from './cs-order-requests/cs-order-requests.component';
import { CompleteNsOrdersComponent } from './complete-ns-orders/complete-ns-orders.component';
import { CompleteCsOrdersComponent } from './complete-cs-orders/complete-cs-orders.component';
import { LgServicesComponent } from './lg-services/lg-services.component';
import { CheckLegalAdviceComponent } from './check-legal-advice/check-legal-advice.component';
import { CompleteLegalAdviceComponent } from './complete-legal-advice/complete-legal-advice.component';
import { CheckCdOrderComponent } from './check-cd-order/check-cd-order.component';

@NgModule({
  declarations: [
    HomeComponent,
    SelectRequiredDocsComponent,
    InvoiceComponent,
    MainServicesComponent,
    SelectServicesComponent,
    UploadRequiredDocsComponent,
    OrderRequestsComponent,
    ProfileComponent,
    NotaryServiceComponent,
    NotaryServiceStep01Component,
    NotaryServiceStep02Component,
    NotaryServiceStep03Component,
    NotaryOrderRequestsComponent,
    CheckTrOrderComponent,
    CheckNsOrderComponent,
    CompleteTrOrdersComponent,
    CsServiceComponent,
    CsServiceSubmitDetailsComponent,
    CsOrderRequestsComponent,
    CompleteNsOrdersComponent,
    CompleteCsOrdersComponent,
    LgServicesComponent,
    CheckLegalAdviceComponent,
    CompleteLegalAdviceComponent,
    CheckCdOrderComponent,
  ],
  imports: [
    CommonModule,
    DashboardModuleRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ]
})
export class DashboardModuleModule { }
