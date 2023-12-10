import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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

  initdocumentAndOtherInfoForm() {
    
  }

}
