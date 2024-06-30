import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataShareService } from 'src/app/services/data/data-share.service';
import { NotaryServiceFirstStep } from 'src/app/shared/models/NotaryServiceFirstStep/notary-service-first-step';
import { NotaryServiceSecondStep } from 'src/app/shared/models/NotaryServiceSecondStep/notary-service-second-step';

@Component({
  selector: 'app-notary-service-step-02',
  templateUrl: './notary-service-step-02.component.html',
  styleUrls: ['./notary-service-step-02.component.css']
})
export class NotaryServiceStep02Component implements OnInit {

  documentAndOtherInfoForm!: FormGroup;
  firstStepModel = new NotaryServiceFirstStep();
  secondStepModel = new NotaryServiceSecondStep();
  firstDocList: File[] = [];
  secondDocList: File[] = [];
  thirdDocList: File[] = [];
  firstPageSessionData!: any;

  constructor(private formBuilder: FormBuilder, private router: Router, private dataShareService: DataShareService, private tostr: ToastrService) {}

  ngOnInit(): void {

    const existingData = localStorage.getItem("notaryServiceDataObject");
    this.firstPageSessionData = existingData ? JSON.parse(existingData) : [];

    this.dataShareService.getComponentValueObj().subscribe((data: NotaryServiceFirstStep) => {
      this.firstStepModel = data;
    })

    this.initdocumentAndOtherInfoForm();

    if (this.firstPageSessionData != null) {
      this.documentAndOtherInfoForm.controls['firstDoc'].setValue(this.firstPageSessionData[1].firstDocList)
    }
  }

  onChangeFirstDoc($event: any) {
    this.firstDocList = Array.from($event.target.files);
  }

  onChangeSecondDoc($event: any) {
    this.secondDocList = Array.from($event.target.files);
  }

  onChangeThirdDoc($event: any) {
    this.thirdDocList = Array.from($event.target.files);
  }

  onSubmitDocumentAndAditionalInfoForm() {

    const firstDoc = this.documentAndOtherInfoForm.controls['firstDoc'].value;
    const secondDoc = this.documentAndOtherInfoForm.controls['secondDoc'].value;
    const thirdDoc = this.documentAndOtherInfoForm.controls['thirdDoc'].value;
    const dateOfSigning = this.documentAndOtherInfoForm.controls['dateOfSigning'].value;
    const startDate = this.documentAndOtherInfoForm.controls['startDate'].value;
    const endDate = this.documentAndOtherInfoForm.controls['endDate'].value;
    const value = this.documentAndOtherInfoForm.controls['value'].value;
    const monthlyRent = this.documentAndOtherInfoForm.controls['monthlyRent'].value;
    const advanceAmount = this.documentAndOtherInfoForm.controls['advanceAmt'].value;
    const VODNumber = this.documentAndOtherInfoForm.controls['VODNumber'].value;
    const devitionalSec = this.documentAndOtherInfoForm.controls['devitionalSec'].value;
    const localGov = this.documentAndOtherInfoForm.controls['localGov'].value;
    const district = this.documentAndOtherInfoForm.controls['district'].value;
    const landRegOffice = this.documentAndOtherInfoForm.controls['landRegOffice'].value;

    console.log(firstDoc);

    /*if (firstDoc == "") {
      this.tostr.error("Empty Feilds Found", "First Document is Reuired.");
    } else if (secondDoc == "") {
      this.tostr.error("Empty Feilds Found", "Second Document is Reuired.");
    } else if (thirdDoc == "") {
      this.tostr.error("Empty Feilds Found", "Third Document is Reuired.");
    } else */ if (dateOfSigning == "") {
      this.tostr.error("Empty Feilds Found", "Date of Signing is Reuired.");
    }/* else if (startDate == "") {
      this.tostr.error("Empty Feilds Found", "Start Date is Reuired.");
    } else if (endDate == "") {
      this.tostr.error("Empty Feilds Found", "End Date is Reuired.");
    }*/ else if (value == "") {
      this.tostr.error("Empty Feilds Found", "Value is Reuired.");
    }/* else if (monthlyRent == "") {
      this.tostr.error("Empty Feilds Found", "Monthly Rent is Reuired.");
    }*/ else if (advanceAmount == "") {
      this.tostr.error("Empty Feilds Found", "Advance Amount is Reuired.");
    } else if (VODNumber == "") {
      this.tostr.error("Empty Feilds Found", "VOD Number is Reuired.");
    } else if (devitionalSec == "") {
      this.tostr.error("Empty Feilds Found", "Devisitional is Reuired.");
    } else if (localGov == "") {
      this.tostr.error("Empty Feilds Found", "First Document is Reuired.");
    } else if (district == "") {
      this.tostr.error("Empty Feilds Found", "District is Reuired.");
    } else if (landRegOffice == "") {
      this.tostr.error("Empty Feilds Found", "Land Registration is Reuired.");
    } else {

      this.firstDocList.forEach((eachDoc: File) => {
        this.convertImageToBase64(eachDoc).then((base64String) => {
          this.secondStepModel.firstDocList.push(base64String);
        })
      })

      this.secondDocList.forEach((eachDoc: File) => {
        this.convertImageToBase64(eachDoc).then((base64String) => {
          this.secondStepModel.secondDoc.push(base64String);
        })
      })

      this.thirdDocList.forEach((eachDoc: File) => {
        this.convertImageToBase64(eachDoc).then((base64String) => {
          this.secondStepModel.thirdDoc.push(base64String);
        })
      })

      this.secondStepModel.dateOfSigning = dateOfSigning;
      this.secondStepModel.startDate = startDate;
      this.secondStepModel.endDate = endDate;
      this.secondStepModel.value = value;
      this.secondStepModel.advanceAmount = advanceAmount;
      this.secondStepModel.monthlyRent = monthlyRent;
      this.secondStepModel.VODNumber = VODNumber;
      this.secondStepModel.ds = devitionalSec;
      this.secondStepModel.localGov = localGov;
      this.secondStepModel.district = district;
      this.secondStepModel.lro = landRegOffice;
      this.secondStepModel.firstStepData = this.firstStepModel;

      this.dataShareService.setComponentValueObj(this.secondStepModel);
      
      if (this.firstPageSessionData != null) {
        this.firstPageSessionData.push(this.secondStepModel);
        localStorage.setItem("notaryServiceDataObject", JSON.stringify(this.firstPageSessionData));
      }

      this.router.navigate(['app/select-services/notary-service/step-03'])
    }
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

  goToPrevPage() {
    this.router.navigate(['/app/select-services/notary-service/step-01']);
  }

}
