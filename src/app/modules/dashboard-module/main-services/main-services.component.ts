import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataShareService } from 'src/app/services/data/data-share.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-main-services',
  templateUrl: './main-services.component.html',
  styleUrls: ['./main-services.component.css']
})
export class MainServicesComponent implements OnInit {

  paymentStatus = false;

  constructor(private router: Router, private dataShareService: DataShareService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.paymentStatus = this.activatedRoute.snapshot.params['paymentStatus'];
    const paySuccessLog = sessionStorage.getItem("paymentSuccessLog");

    console.log(paySuccessLog);

    if (this.paymentStatus && paySuccessLog) {
      $('#exampleModal').show();
      sessionStorage.setItem("paymentSuccessLog", "1");
    }
  }

  onSelectMainService(mainServiceId: number) {

    if (mainServiceId == 1) {
      this.router.navigate(['app/select-services/step-02']);
    } else if (mainServiceId == 2) {
      this.router.navigate(['app/select-services/notary-service'])
    }

    return false;
  }

}
