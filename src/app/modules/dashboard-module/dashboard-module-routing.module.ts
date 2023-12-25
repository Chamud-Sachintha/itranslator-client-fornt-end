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

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
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
      }
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardModuleRoutingModule { }
