import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotaryServicePerson } from 'src/app/shared/models/NotaryServicePerson/notary-service-person';
import { NotaryServicePersonList } from 'src/app/shared/models/NotaryServicePersonList/notary-service-person-list';

@Component({
  selector: 'app-notary-service-step-03',
  templateUrl: './notary-service-step-03.component.html',
  styleUrls: ['./notary-service-step-03.component.css']
})
export class NotaryServiceStep03Component implements OnInit {

  addPersonForm!: FormGroup;
  addedPersonList = new NotaryServicePersonList();
  notaryServicePerson = new NotaryServicePerson();
  personCategory!: string;

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.initAddPersonForm();
  }

  setPersonCatgeory(category: string) {
    if (category == "1") {
      this.personCategory = "තෑගි දීමනාකරු / Donor";
    } else if (category == "2") {
      this.personCategory = "තෑගි ලැබුම්කරු / Donee";
    } else if (category == "3") {
      this.personCategory = "ණය හිමියා / Lender";
    } else if (category == "4") {
      this.personCategory = "ණය ගැතියා / the borrower";
    } else {

    }
  }

  onSubmitAddPersonForm() {
    const name = this.addPersonForm.controls['name'].value;
    const address = this.addPersonForm.controls['address'].value;
    const nicNumber = this.addPersonForm.controls['nicNumber'].value;
    const passport = this.addPersonForm.controls['passport'].value;
    const drivingLic = this.addPersonForm.controls['drivingLic'].value;
    const adultNic = this.addPersonForm.controls['adultNic'].value;
    const bcNumber = this.addPersonForm.controls['bcNumber'].value;
    const mcNumber = this.addPersonForm.controls['mcNumber'].value;
    const natureOfSig = this.addPersonForm.controls['natureOfSig'].value;
    const phoneNumber = this.addPersonForm.controls['phoneNumber'].value;
    const email = this.addPersonForm.controls['email'].value;

    if (name == "") {

    } else if (address == "") {

    } else if (nicNumber == "") {

    } else if (passport == "") {
      
    } else if (drivingLic == "") {

    } else if (adultNic == "") {

    } else if (bcNumber == "") {

    } else if (mcNumber == "") {

    } else if (natureOfSig == "") {

    } else if (phoneNumber == "") {

    } else if (email == "") {

    } else {
      this.notaryServicePerson.personCategory = this.personCategory;
      this.notaryServicePerson.name = name;
      this.notaryServicePerson.address = address;
      this.notaryServicePerson.nicNumber = nicNumber;
      this.notaryServicePerson.passportNo = passport;
      this.notaryServicePerson.drivingLicNo = drivingLic;
      this.notaryServicePerson.adultIdNumber = adultNic;
      this.notaryServicePerson.bcNumber = bcNumber;
      this.notaryServicePerson.mcNumber = mcNumber;
      this.notaryServicePerson.natureOfSignature = natureOfSig;
      this.notaryServicePerson.phoneNumber = phoneNumber;
      this.notaryServicePerson.email = email;

      this.addedPersonList.notaryPerson.push(this.notaryServicePerson);
    }
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
