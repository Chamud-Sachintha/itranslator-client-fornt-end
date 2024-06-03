import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MainServicesComponent } from './main-services/main-services.component';
import { SelectRequiredDocsComponent } from './select-required-docs/select-required-docs.component';
import { UploadRequiredDocsComponent } from './upload-required-docs/upload-required-docs.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { SelectServicesComponent } from './select-services/select-services.component';
import { OrderRequestsComponent } from './order-requests/order-requests.component';
import { NotaryServiceComponent } from './notary-service/notary-service.component';
import { NotaryServiceStep01Component } from './notary-service-step-01/notary-service-step-01.component';
import { NotaryServiceStep02Component } from './notary-service-step-02/notary-service-step-02.component';
import { NotaryServiceStep03Component } from './notary-service-step-03/notary-service-step-03.component';
import { NotaryOrderRequestsComponent } from './notary-order-requests/notary-order-requests.component';
import { CheckTrOrderComponent } from './check-tr-order/check-tr-order.component';
import { CheckNsOrderComponent } from './check-ns-order/check-ns-order.component';
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

const routes: Routes = [
  {
    path: '',
    redirectTo: 'select-services',
    pathMatch: 'full'
  },

  {
    path: 'home',
    component: HomeComponent
  },

  {
    path: 'select-services',
    component: SelectServicesComponent,
    children: [
      {
        path: '',
        redirectTo: 'step-01',
        pathMatch: 'full'
      },
      {
        path: 'step-01',
        component: MainServicesComponent
      },
      {
        path: 'step-02',
        component: SelectRequiredDocsComponent
      },
      {
        path: 'step-03',
        component: UploadRequiredDocsComponent
      },
      {
        path: 'step-04',
        component: InvoiceComponent
      },

      // second main service steppers

      {
        path: 'notary-service',
        component: NotaryServiceComponent,
        children: [
          {
            path: '',
            redirectTo: 'step-01',
            pathMatch: 'full'
          },
          {
            path: 'step-01',
            component: NotaryServiceStep01Component
          },
          {
            path: 'step-02',
            component: NotaryServiceStep02Component
          },
          {
            path: 'step-03',
            component: NotaryServiceStep03Component
          }
        ]
      },

      {
        path: 'cs-service',
        component: CsServiceComponent,
        children: [
          {
            path: '',
            redirectTo: 'submit-details',
            pathMatch: 'full'
          },
          {
            path: 'submit-details',
            component: CsServiceSubmitDetailsComponent
          }
        ]
      },
      {
        path: 'lg-service',
        component: LgServicesComponent,
        children: [
          {
            path: '',
            redirectTo: 'lg-submit-details',
            pathMatch: 'full'
          },
          {
            path: 'lg-submit-details',
            component: LgServicesComponent
          }
        ]
      },

    ]
  },
  {
    path: 'order-requests',
    component: OrderRequestsComponent
  },
  {
    path: 'check-order/:invoiceNo',
    component: CheckTrOrderComponent
  },
  {
    path: 'check-ns-order/:invoiceNo',
    component: CheckNsOrderComponent
  },
  {
    path: 'notary-order-requests',
    component: NotaryOrderRequestsComponent
  },
  {
    path: 'cs-order-requests',
    component: CsOrderRequestsComponent
  },
  {
    path: 'complete-tr-orders',
    component: CompleteTrOrdersComponent
  },
  {
    path: 'complete-order-requests',
    component: CompleteNsOrdersComponent
  },
  /*{
    path: 'check-cs-order/:invoiceNo',
    component: CheckCdOrderComponent
  },*/
  {
  path: 'check-cs-order/:invoiceNo/:additionalParam',
    component: CheckCdOrderComponent
  },
  {
    path: 'complete-cs-order-requests',
    component: CompleteCsOrdersComponent
  },
  {
    path: 'legal-advice-requests',
    component: CheckLegalAdviceComponent
  },
  {
    path: 'complete-legal-advice-requests',
    component: CompleteLegalAdviceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardModuleRoutingModule { }
