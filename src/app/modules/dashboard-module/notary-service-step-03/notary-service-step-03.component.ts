import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataShareService } from 'src/app/services/data/data-share.service';
import { NotaryService } from 'src/app/services/notary/notary.service';
import { NotaryServicePerson } from 'src/app/shared/models/NotaryServicePerson/notary-service-person';
import { NotaryServicePersonList } from 'src/app/shared/models/NotaryServicePersonList/notary-service-person-list';
import { NotaryServiceSecondStep } from 'src/app/shared/models/NotaryServiceSecondStep/notary-service-second-step';
import { Request } from 'src/app/shared/models/Request/request';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-notary-service-step-03',
  templateUrl: './notary-service-step-03.component.html',
  styleUrls: ['./notary-service-step-03.component.css']
})
export class NotaryServiceStep03Component implements OnInit {

  @ViewChild('exampleModal') modal!: ElementRef ;
  
  addPersonForm!: FormGroup;
  addedPersonList = new NotaryServicePersonList();
  notaryServicePerson = new NotaryServicePerson();
  secondStepData = new NotaryServiceSecondStep();
  requestParamModel = new Request();
  personCategory!: string;
  naturesignatureDoc: File[] = [];
  model:boolean = false;
  isVisible: boolean = false;
  //private modalService = inject(NgbModal);

  constructor(private formBuilder: FormBuilder, private router: Router, private dataShareService: DataShareService
            , private notaryService: NotaryService, private tostr: ToastrService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.initAddPersonForm();
    
    this.dataShareService.getComponentValueObj().subscribe((data: NotaryServiceSecondStep) => {
      this.secondStepData = data;
      
    })
  }

  onClickSaveProcess() {
   
    this.addedPersonList.secondStepData = this.secondStepData;
 //console.log('Save Data',this.addedPersonList);
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
        this.tostr.success("Place Notary Servuice Order", "Order Placed Successfully");
        this.router.navigate(['app/select-services/step-01'])
      } else {
        this.tostr.error("Place Notary Servuice Order", resp.message);
      }
    })
  }

  onChangeSecondDoc($event: any) {
    this.naturesignatureDoc = Array.from($event.target.files);
  }

  convertImageToBase64(fileInput: any): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const file: File = fileInput;
      const reader: FileReader = new FileReader();

      reader.onloadend = () => {
        // The result attribute contains the base64 string
        const base64String: string = reader.result as string;
        resolve(base64String);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      // Read the image file as a Data URL
      reader.readAsDataURL(file);
    });
  }

  setPersonCatgeory(category: string) {
    this.model = true;
    this.isVisible = true;
    console.log('visible',this.isVisible);

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
      this.tostr.error("Empty Feilds Found", "Name is required.");
    } else if (address == "") {
      this.tostr.error("Empty Feilds Found", "Address is required.");
    } else if (nicNumber == "") {
      this.tostr.error("Empty Feilds Found", "NIC Number is required.");
    }/* else if (passport == "") {
      this.tostr.error("Empty Feilds Found", "Passport is required.");
    } else if (drivingLic == "") {
      this.tostr.error("Empty Feilds Found", "Driving Licence is required.");
    } else if (adultNic == "") {
      this.tostr.error("Empty Feilds Found", "Adult NIC is required.");
    } */else if (bcNumber == "") {
      this.tostr.error("Empty Feilds Found", "Birth Certificate Number is required.");
    } /*else if (mcNumber == "") {
      this.tostr.error("Empty Feilds Found", "MC Number is required.");
    } */else if (natureOfSig == "") {
      this.tostr.error("Empty Feilds Found", "Nature Of Signing is required.");
    } else if (phoneNumber == "") {
      this.tostr.error("Empty Feilds Found", "Phone Number is required.");
    } /*else if (email == "") {
      this.tostr.error("Empty Feilds Found", "Email is required.");
    } */else {
      const notaryServicePersonObj = new NotaryServicePerson();

      notaryServicePersonObj.personCategory = this.personCategory;
      notaryServicePersonObj.name = name;
      notaryServicePersonObj.address = address;
      notaryServicePersonObj.nicNumber = nicNumber;
      notaryServicePersonObj.passportNo = passport;
      notaryServicePersonObj.drivingLicNo = drivingLic;
      notaryServicePersonObj.adultIdNumber = adultNic;
      notaryServicePersonObj.bcNumber = bcNumber;
      notaryServicePersonObj.mcNumber = mcNumber;

      this.naturesignatureDoc.forEach((eachDoc: File) => {
        this.convertImageToBase64(eachDoc).then((base64String) => {
          notaryServicePersonObj.natureOfSignature.push(base64String);
        })

      })

     // notaryServicePersonObj.natureOfSignature = natureOfSig;
      notaryServicePersonObj.phoneNumber = phoneNumber;
      notaryServicePersonObj.email = email;

      this.addedPersonList.notaryPerson.push(notaryServicePersonObj);
      this.addPersonForm.reset();
      this.initAddPersonForm();
      this.modalService.dismissAll(); 
      this.isVisible = false;
      this.model = false;
     
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
