import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notary-service-step-03',
  templateUrl: './notary-service-step-03.component.html',
  styleUrls: ['./notary-service-step-03.component.css']
})
export class NotaryServiceStep03Component implements OnInit {

  addPersonForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.initAddPersonForm();
  }

  onSubmitAddPersonForm() {
    
  }

  initAddPersonForm() {
    this.addPersonForm = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      nicNumber: ['', Validators.required],
      passport: ['', Validators.required],
      drivingLic: ['', Validators.required],
      adultNic: ['', Validators.required],
      bcNumber: ['', Validators.required],
      mcNumber: ['', Validators.required],
      natureOfSig: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', Validators.required]
    })
  }

}
