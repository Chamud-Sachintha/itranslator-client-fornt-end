import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notary-service-step-02',
  templateUrl: './notary-service-step-02.component.html',
  styleUrls: ['./notary-service-step-02.component.css']
})
export class NotaryServiceStep02Component implements OnInit {

  documentAndOtherInfoForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.initdocumentAndOtherInfoForm();
  }

  onSubmitDocumentAndAditionalInfoForm() {
    this.router.navigate(['app/select-services/notary-service/step-03'])
  }

  initdocumentAndOtherInfoForm() {
    this.documentAndOtherInfoForm = this.formBuilder.group({
      firstDoc: ['', Validators.required],
      secondDoc: ['', Validators.required],
      thirdDoc: ['', Validators.required],
      dateOfSigning: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      value: ['', Validators.required],
      monthlyRent: ['', Validators.required],
      advanceAmt: ['', Validators.required],
      VODNumber: ['', Validators.required],
      devitionalSec: ['', Validators.required],
      localGov: ['', Validators.required],
      district: ['', Validators.required],
      landRegOffice: ['', Validators.required]
    })
  }

}
