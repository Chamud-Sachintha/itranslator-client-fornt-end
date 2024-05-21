import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataShareService } from 'src/app/services/data/data-share.service';
import { OrderService } from 'src/app/services/order/order.service';
import { Request } from 'src/app/shared/models/Request/request';
declare var $: any; 

@Component({
  selector: 'app-main-services',
  templateUrl: './main-services.component.html',
  styleUrls: ['./main-services.component.css']
})
export class MainServicesComponent implements OnInit {

  requestParamModel = new Request();
  paymentStatus = false;

  constructor(private router: Router, private dataShareService: DataShareService, private activatedRoute: ActivatedRoute
            , private orderService: OrderService) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      this.paymentStatus = params['payment_success'];

      if (this.paymentStatus) {
        this.addPaymentGateWaySuccessLog();
      }
    })
  }

  addPaymentGateWaySuccessLog() {

    this.requestParamModel.token = sessionStorage.getItem("authToken");
    this.requestParamModel.flag = sessionStorage.getItem("role");
    this.requestParamModel.reference = sessionStorage.getItem("reference");

    this.orderService.addPaymentGatewaySuccessLog(this.requestParamModel).subscribe((resp: any) => {

      if (resp.code === 1) {
        $('#exampleModal').modal('show');
      }
    })
  }

  onSelectMainService(mainServiceId: number) {

    if (mainServiceId == 1) {
      this.router.navigate(['app/select-services/step-02']);
    } else if (mainServiceId == 2) {
      this.router.navigate(['app/select-services/notary-service'])
    } else if (mainServiceId == 3) {
      this.router.navigate(['app/select-services/lg-service'])
    }
     else if (mainServiceId == 4) {
      this.router.navigate(['app/select-services/cs-service'])
    }

    return false;
  }

}
