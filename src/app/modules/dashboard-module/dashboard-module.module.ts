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


@NgModule({
  declarations: [
    HomeComponent,
    SelectRequiredDocsComponent,
    InvoiceComponent,
    MainServicesComponent,
    SelectServicesComponent,
    UploadRequiredDocsComponent
  ],
  imports: [
    CommonModule,
    DashboardModuleRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DashboardModuleModule { }
