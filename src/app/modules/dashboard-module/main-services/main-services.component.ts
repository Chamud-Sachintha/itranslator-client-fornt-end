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

  onSelectMainService(mainServiceId: number) {

    if (mainServiceId == 1) {
      this.router.navigate(['app/select-services/step-02']);
    } else if (mainServiceId == 2) {
      this.router.navigate(['app/select-services/notary-service'])
    }

    return false;
  }

}
