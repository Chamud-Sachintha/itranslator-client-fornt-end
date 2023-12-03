import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataShareService } from 'src/app/services/data/data-share.service';

@Component({
  selector: 'app-main-services',
  templateUrl: './main-services.component.html',
  styleUrls: ['./main-services.component.css']
})
export class MainServicesComponent implements OnInit {

  constructor(private router: Router, private dataShareService: DataShareService) {}

  ngOnInit(): void {
    
  }

  onSelectMainService(serviceId: number) {
    const data = {
      serviceId: serviceId
    }

    this.dataShareService.setComponentValueObj(data);
    this.router.navigate(['app/select-services/step-02']);

    return false;
  }

}
