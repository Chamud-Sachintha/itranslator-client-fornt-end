import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DataShareService } from 'src/app/services/data/data-share.service';
import { ServiceService } from 'src/app/services/service/service.service';
import { Request } from 'src/app/shared/models/Request/request';
import { Service } from 'src/app/shared/models/service/service';

@Component({
  selector: 'app-select-required-docs',
  templateUrl: './select-required-docs.component.html',
  styleUrls: ['./select-required-docs.component.css']
})
export class SelectRequiredDocsComponent implements OnInit {

  enableServiceList: any[] = [];
  serviceModel = new Service();
  requestModel = new Request();
  serviceList: Service[] = [];
  servicesArray: any [] = [];

  constructor(private router: Router, private dataShareService: DataShareService, private location: Location
            , private serviceService: ServiceService, private tostr: ToastrService, private spinner: NgxSpinnerService) {}

  ngOnInit() {

    this.getServiceList();

    setTimeout(() => {
      const cacheObject = localStorage.getItem("enableService");

      if (cacheObject != null) {
        const object = JSON.parse(cacheObject);
        
        object.forEach((el: any) => {
          const element: any = document.getElementById(el.serviceId);
          if (element) {
            element.checked = true;
          } else {
            console.warn(`Element with ID ${el.serviceId} not found.`);
          }
        })
      }
    }, 1400);
  }

  getServiceList() {
    this.requestModel.token = sessionStorage.getItem("authToken");
    this.requestModel.flag = sessionStorage.getItem("role");

    this.spinner.show();
    this.serviceService.getServiceList(this.requestModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        dataList.data[0].forEach((eachService: Service) => {
          this.serviceList.push(eachService)
        })
      }

      this.spinner.hide();
    }, (err) => {})
  }

  onChangeToggle(serviceId: number, serviceName: string, description: string, value: any) {

    const existingServices = localStorage.getItem("enableService");

    // Parse the existing list or initialize a new array if it doesn't exist
    this.servicesArray = existingServices ? JSON.parse(existingServices) : [];

    if (value.target.checked) {
      const requestServiceModel = {
        serviceId: serviceId,
        serviceName: serviceName,
        description: description,
      }

      // Add the new service model to the array
      this.servicesArray.push(requestServiceModel);

      // Save the updated array back to local storage
      localStorage.setItem("enableService", JSON.stringify(this.servicesArray));

      this.enableServiceList.push(requestServiceModel);
    } else {

      // Remove the service model with the matching serviceId from the array
      this.servicesArray = this.servicesArray.filter((service: any) => service.serviceId !== serviceId);
      localStorage.setItem("enableService", JSON.stringify(this.servicesArray));

      this.enableServiceList.forEach((eachRow: any, index) => {
        if (eachRow.serviceId == serviceId) {
          this.enableServiceList.splice(index, 1);
        }
      }) 
    }
  }

  goToStep2($event: any) {
    
    const cacheObject = localStorage.getItem("enableService");

    if (this.enableServiceList.length == 0 && cacheObject == null) {
      this.tostr.error("Select Translation Document", "Select One or More Translation Docuemnts to Proceed.");
    } else {

      if (cacheObject != null) {
        this.enableServiceList = JSON.parse(cacheObject);
      }

      this.dataShareService.setComponentValueObj(this.enableServiceList);
      this.router.navigate(['app/select-services/step-03']);
    }
  }

  onClickPreviousBtn() {
    this.location.back();
  }

}
