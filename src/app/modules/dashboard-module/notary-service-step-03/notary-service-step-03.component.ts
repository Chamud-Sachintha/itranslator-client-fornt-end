import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataShareService } from 'src/app/services/data/data-share.service';
import { NotaryService } from 'src/app/services/notary/notary.service';
import { NotaryServicePerson } from 'src/app/shared/models/NotaryServicePerson/notary-service-person';
import { NotaryServicePersonList } from 'src/app/shared/models/NotaryServicePersonList/notary-service-person-list';
import { NotaryServiceSecondStep } from 'src/app/shared/models/NotaryServiceSecondStep/notary-service-second-step';
import { Request } from 'src/app/shared/models/Request/request';

@Component({
  selector: 'app-notary-service-step-03',
  templateUrl: './notary-service-step-03.component.html',
  styleUrls: ['./notary-service-step-03.component.css']
})
export class NotaryServiceStep03Component implements OnInit {

  addPersonForm!: FormGroup;
  addedPersonList = new NotaryServicePersonList();
  notaryServicePerson = new NotaryServicePerson();
  secondStepData = new NotaryServiceSecondStep();
  requestParamModel = new Request();
  personCategory!: string;

  constructor(private formBuilder: FormBuilder, private router: Router, private dataShareService: DataShareService
            , private notaryService: NotaryService) {}

  ngOnInit(): void {
    this.initAddPersonForm();

    this.dataShareService.getComponentValueObj().subscribe((data: NotaryServiceSecondStep) => {
      this.secondStepData = data;
    })
  }

  onClickSaveProcess() {
    this.addedPersonList.secondStepData = this.secondStepData;

    this.requestParamModel.token = sessionStorage.getItem("authToken");
    this.requestParamModel.flag = sessionStorage.getItem("role");
    this.requestParamModel.mainNotaryCategory = this.addedPersonList.secondStepData.firstStepData.mainCategory;
    this.requestParamModel.subNotaryCategory = this.addedPersonList.secondStepData.firstStepData.subCategory;
    this.requestParamModel.serviceDescription = this.addedPersonList.secondStepData.firstStepData.descriptionOfService;
    this.requestParamModel.firstDoc = this.addedPersonList.secondStepData.firstDocList;
    this.requestParamModel.secondDoc = this.addedPersonList.secondStepData.secondDoc;
    this.requestParamModel.thirdDoc = this.addedPersonList.secondStepData.thirdDoc;
    this.requestParamModel.dateOfSigning = this.addedPersonList.secondStepData.dateOfSigning;
    this.requestParamModel.startDate = this.addedPersonList.secondStepData.startDate;
    this.requestParamModel.endDate = this.addedPersonList.secondStepData.endDate;
    this.requestParamModel.value = this.addedPersonList.secondStepData.value;
    this.requestParamModel.monthlyRent = this.addedPersonList.secondStepData.monthlyRent;
    this.requestParamModel.advanceAmt = this.addedPersonList.secondStepData.advanceAmount;
    this.requestParamModel.vodNumber = this.addedPersonList.secondStepData.VODNumber;
    this.requestParamModel.ds = this.addedPersonList.secondStepData.ds;
    this.requestParamModel.lg = this.addedPersonList.secondStepData.localGov;
    this.requestParamModel.district = this.addedPersonList.secondStepData.district;
    this.requestParamModel.lro = this.addedPersonList.secondStepData.lro;
    this.requestParamModel.notaryServicePersonList = this.addedPersonList.notaryPerson;

    this.notaryService.placeNotaryServiceOrder(this.requestParamModel).subscribe((resp: any) => {

      if (resp.code === 1) {
        
      }
    })
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
