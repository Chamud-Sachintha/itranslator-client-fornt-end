import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataShareService } from 'src/app/services/data/data-share.service';

@Component({
  selector: 'app-notary-service-step-01',
  templateUrl: './notary-service-step-01.component.html',
  styleUrls: ['./notary-service-step-01.component.css']
})
export class NotaryServiceStep01Component implements OnInit {

  basicInfoForm!: FormGroup;

  constructor(private dataShareService: DataShareService, private router: Router, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initBasicInfoForm();
  }

  initBasicInfoForm() {
    this.basicInfoForm = this.formBuilder.group({
      mainCategory: ['', Validators.required],
      subCategory: ['', Validators.required],
      description: ['', Validators.required],
    })
  }

  onSubmitBasicInfoForm() {
    this.router.navigate(['app/select-services/notary-service/step-02'])
  }

}
