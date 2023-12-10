import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MainServicesComponent } from './main-services/main-services.component';
import { SelectRequiredDocsComponent } from './select-required-docs/select-required-docs.component';
import { UploadRequiredDocsComponent } from './upload-required-docs/upload-required-docs.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { SelectServicesComponent } from './select-services/select-services.component';
import { OrderRequestsComponent } from './order-requests/order-requests.component';

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
      }
    ]
  },
  {
    path: 'order-requests',
    component: OrderRequestsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardModuleRoutingModule { }
