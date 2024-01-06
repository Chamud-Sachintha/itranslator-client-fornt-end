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

  constructor(private router: Router, private dataShareService: DataShareService, private location: Location
            , private serviceService: ServiceService, private tostr: ToastrService, private spinner: NgxSpinnerService) {}

  ngOnInit() {
    this.getServiceList();
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
    if (value.target.checked) {
      const requestServiceModel = {
        serviceId: serviceId,
        serviceName: serviceName,
        description: description,
      }

      this.enableServiceList.push(requestServiceModel);
    } else {
      this.enableServiceList.forEach((eachRow: any, index) => {
        if (eachRow.serviceId == serviceId) {
          this.enableServiceList.splice(index, 1);
        }
      })
    }
  }

  goToStep2($event: any) {

    if (this.enableServiceList.length == 0) {
      this.tostr.error("Select Translation Document", "Select One or More Translation Docuemnts to Proceed.");
    } else {
      this.dataShareService.setComponentValueObj(this.enableServiceList);
      this.router.navigate(['app/select-services/step-03']);
    }
  }

  onClickPreviousBtn() {
    this.location.back();
  }

}
