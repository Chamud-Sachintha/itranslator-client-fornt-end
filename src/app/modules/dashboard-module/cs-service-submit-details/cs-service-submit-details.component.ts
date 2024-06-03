import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CsService } from 'src/app/services/cs/cs.service';

@Component({
  selector: 'app-cs-service-submit-details',
  templateUrl: './cs-service-submit-details.component.html',
  styleUrls: ['./cs-service-submit-details.component.css']
})
export class CsServiceSubmitDetailsComponent implements OnInit {

  serviceList: any[] = [
    {
      name: 'නව මාගමේ ං ්ථාපනය / ලියාපදිංචි කරවා ගැනීම / Incorporation / Registration of a new company',
      descriptiom: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.'
    },

    {
      name: 'පවතින මාගමක සතොරතුරු ංසශෝධනය කරවා ගැනීම / Amend existing company details ',
      descriptiom: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.'
    },

    {
      name: 'පවතින මාගමකට නව අධයේෂකවරු ඇතුලත් ණීීමම / Admission of new directors to an existing company',
      descriptiom: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.'
    },

    {
      name: 'පවතින මාගමක අධයේෂකවරු ඉවත් ණීීමම / Removal of directors of an existing company ',
      descriptiom: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.'
    },

    {
      name: 'පිටපත් අය දම් කරවා ගැනීම / Application for copies',
      descriptiom: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.'
    },

    {
      name: 'සවනත් ස ේවා ලබාගැනීම ෙහා / To get other services',
      descriptiom: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.'
    },

    {
      name: 'ගා ්තු සගවීම / Payment of fees',
      descriptiom: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.'
    }
  ];

  firstServiceFormModelOpen = false;
  secondServiceFormModalOpen = false;
  thirdServiceFormModalOpen = false;
  forthServiceFormModalOpen = false;
  fifthServiceFormModalOpen = false;
  sixthServiceFormModalOpen = false;
  sevenServiceFormModalOpen = false;

  firstServiceForm!: FormGroup;
  secondServiceForm!: FormGroup;
  thirdServiceForm!: FormGroup;
  fourthServiceForm!: FormGroup;
  fifthServiceForm!: FormGroup;
  sixthServiceForm!: FormGroup;
  sevenServiceForm!: FormGroup;

  firstServiceRequiredDocList: any[] = [];
  firstServiceNICImages: any[] = [];
  secondServiceDocs: any[] = [];
  thirdServiceDocList: any[] = [];
  thirdServiceIntentLetter: any;
  forthServiceDocList: any[] = [];
  forthServiceResignLetter: any;
  fifthServiceDocList: any[] = [];
  sixthServiceDocList: any[] = [];
  seventhServiceDocList: any[] = [];
  serviceIndex!: string;

  constructor(private formBuilder: FormBuilder, private csService: CsService, private tostr: ToastrService) {}

  ngOnInit(): void {
    this.initFirstServiceForm();
    this.initSecondServiceForm();
    this.initThirdServiceForm();
    this.initForthServiceForm();
    this.initFifthServiceForm();
    this.initSixthServiceForm();
    this.initSevenServiceForm();
  }

  submitSeventhServiceForm() {
    const companyName = this.sevenServiceForm.controls['companyName'].value;
    const regNumber = this.sevenServiceForm.controls['regNumber'].value;
    const description = this.sevenServiceForm.controls['description'].value;

    if (companyName == "") {

    } else if (regNumber == "") {

    } else if (description == "") {

    } else {
      const seventhServiceFormData = new FormData();

      const token: any = sessionStorage.getItem("authToken");
      const flag: any = sessionStorage.getItem("role");

      seventhServiceFormData.append("token", token);
      seventhServiceFormData.append("flag", flag);
      seventhServiceFormData.append("serviceIndex", this.serviceIndex);
      seventhServiceFormData.append("companyName", companyName);
      seventhServiceFormData.append("regNumber", regNumber);
      seventhServiceFormData.append("description", description);

      this.seventhServiceDocList.forEach((eachDoc: File, index) => {
        seventhServiceFormData.append('doc-Info' + index, eachDoc);
      })

      this.csService.placeCsOrder(seventhServiceFormData).subscribe((resp: any) => {

        if (resp.code === 1) {
          this.tostr.success("Place New Order", "Order Placed Successfully");
          window.location.reload();
        } else {
          this.tostr.error("Place New Order", resp.message);
        }
      })
    }
  }

  submitSixthServiceForm() {
    const companyName = this.sixthServiceForm.controls['companyName'].value;
    const regNumber = this.sixthServiceForm.controls['regNumber'].value;
    const description = this.sixthServiceForm.controls['description'].value;

    if (companyName == "") {

    } else if (regNumber == "") {

    } else if (description == "") {

    } else {
      const sixthServiceFormData = new FormData();

      const token: any = sessionStorage.getItem("authToken");
      const flag: any = sessionStorage.getItem("role");

      sixthServiceFormData.append("token", token);
      sixthServiceFormData.append("flag", flag);
      sixthServiceFormData.append("serviceIndex", this.serviceIndex);
      sixthServiceFormData.append("companyName", companyName);
      sixthServiceFormData.append("regNumber", regNumber);
      sixthServiceFormData.append("description", description);

      this.sixthServiceDocList.forEach((eachDoc: File, index) => {
        sixthServiceFormData.append('doc-Info' + index, eachDoc);
      })

      this.csService.placeCsOrder(sixthServiceFormData).subscribe((resp: any) => {

        if (resp.code === 1) {
          this.tostr.success("Place New Order", "Order Placed Successfully");
          window.location.reload();
        } else {
          this.tostr.error("Place New Order", resp.message);
        }
      })
    }
  }

  submitFifthServiceForm() {
    const companyName = this.fifthServiceForm.controls['companyName'].value;
    const regNumber = this.fifthServiceForm.controls['regNumber'].value;
    const description = this.fifthServiceForm.controls['description'].value;

    if (companyName == "") {

    } else if (regNumber == "") {

    } else if (description == "") {

    } else {
      const fifthServiceFormData = new FormData();

      const token: any = sessionStorage.getItem("authToken");
      const flag: any = sessionStorage.getItem("role");

      fifthServiceFormData.append("token", token);
      fifthServiceFormData.append("flag", flag);
      fifthServiceFormData.append("serviceIndex", this.serviceIndex);
      fifthServiceFormData.append("companyName", companyName);
      fifthServiceFormData.append("regNumber", regNumber);
      fifthServiceFormData.append("description", description);

      this.fifthServiceDocList.forEach((eachDoc: File, index) => {
        fifthServiceFormData.append('doc-Info' + index, eachDoc);
      })

      this.csService.placeCsOrder(fifthServiceFormData).subscribe((resp: any) => {

        if (resp.code === 1) {
          this.tostr.success("Place New Order", "Order Placed Successfully");
          window.location.reload();
        } else {
          this.tostr.error("Place New Order", resp.message);
        }
      })
    }
  }

  submitForthServiceForm() {
    const companyName = this.fourthServiceForm.controls['companyName'].value;
    const directorNames = this.fourthServiceForm.controls['directorNames'].value;
    const directorAddress = this.fourthServiceForm.controls['directorAddress'].value;
    const directorTelephones = this.fourthServiceForm.controls['directorTelephones'].value;
    const directorEmails = this.fourthServiceForm.controls['directorEmails'].value;
    const devisionNumber = this.fourthServiceForm.controls['devisionNumber'].value;
    const devisionalSectrial = this.fourthServiceForm.controls['devisionalSectrial'].value;
    const directorDistrict = this.fourthServiceForm.controls['directorDistrict'].value;
    const nicNumberOfDirectors = this.fourthServiceForm.controls['nicNumberOfDirectors'].value;
    const dateOfResign = this.fourthServiceForm.controls['dateOfResign'].value;

    if (companyName == "") {

    } else if (directorNames == "") {

    } else if (directorAddress == "") {

    } else if (directorTelephones == "") {

    } else if (directorEmails == "") {

    } else if (devisionNumber == "") {

    } else if (devisionalSectrial == "") {
      
    } else if (directorDistrict == "") {

    } else if (nicNumberOfDirectors == "") {

    } else {
      const forthServiceFormData = new FormData();

      const token: any = sessionStorage.getItem("authToken");
      const flag: any = sessionStorage.getItem("role");

      forthServiceFormData.append("token", token);
      forthServiceFormData.append("flag", flag);
      forthServiceFormData.append("serviceIndex", this.serviceIndex);
      forthServiceFormData.append("companyName", companyName);
      forthServiceFormData.append("directorNames", directorNames);
      forthServiceFormData.append("directorEmails", directorEmails);
      forthServiceFormData.append("directorAddress", directorAddress);
      forthServiceFormData.append("directorTelephones", directorTelephones);
      forthServiceFormData.append("devisionNumber", devisionNumber);
      forthServiceFormData.append("devisionalSectrial", devisionalSectrial);
      forthServiceFormData.append("directorDistrict", directorDistrict);
      forthServiceFormData.append("nicNumberOfDirectors", nicNumberOfDirectors);
      forthServiceFormData.append("dateOfResign", dateOfResign);

      forthServiceFormData.append("resign", this.forthServiceResignLetter);

      this.forthServiceDocList.forEach((eachDoc: File, index) => {
        forthServiceFormData.append('doc-Info' + index, eachDoc);
      })

      this.csService.placeCsOrder(forthServiceFormData).subscribe((resp: any) => {

        if (resp.code === 1) {
          this.tostr.success("Place New Order", "Order Placed Successfully");

        } else {
          this.tostr.error("Place New Order", resp.message);
        }
      })
    }
  }

  submitThirdServiceForm() {
    const companyName = this.thirdServiceForm.controls['companyName'].value;
    const directorNames = this.thirdServiceForm.controls['directorNames'].value;
    const directorAddress = this.thirdServiceForm.controls['directorAddress'].value;
    const directorTelephones = this.thirdServiceForm.controls['directorTelephones'].value;
    const directorEmails = this.thirdServiceForm.controls['directorEmails'].value;
    const devisionNumber = this.thirdServiceForm.controls['devisionNumber'].value;
    const devisionalSectrial = this.thirdServiceForm.controls['devisionalSectrial'].value;
    const directorDistrict = this.thirdServiceForm.controls['directorDistrict'].value;
    const nicNumberOfDirectors = this.thirdServiceForm.controls['nicNumberOfDirectors'].value;
    const dateOfAppointment = this.thirdServiceForm.controls['dateOfAppointment'].value;

    if (companyName == "") {

    } else if (directorNames == "") {

    } else if (directorAddress == "") {

    } else if (directorTelephones == "") {

    } else if (directorEmails == "") {

    } else if (devisionNumber == "") {

    } else if (devisionalSectrial == "") {
      
    } else if (directorDistrict == "") {

    } else if (nicNumberOfDirectors == "") {

    } else {
      const thirdServiceFormData = new FormData();

      const token: any = sessionStorage.getItem("authToken");
      const flag: any = sessionStorage.getItem("role");

      thirdServiceFormData.append("token", token);
      thirdServiceFormData.append("flag", flag);
      thirdServiceFormData.append("serviceIndex", this.serviceIndex);
      thirdServiceFormData.append("companyName", companyName);
      thirdServiceFormData.append("directorNames", directorNames);
      thirdServiceFormData.append("directorEmails", directorEmails);
      thirdServiceFormData.append("directorAddress", directorAddress);
      thirdServiceFormData.append("directorTelephones", directorTelephones);
      thirdServiceFormData.append("devisionNumber", devisionNumber);
      thirdServiceFormData.append("devisionalSectrial", devisionalSectrial);
      thirdServiceFormData.append("directorDistrict", directorDistrict);
      thirdServiceFormData.append("nicNumberOfDirectors", nicNumberOfDirectors);
      thirdServiceFormData.append("dateOfAppointment", dateOfAppointment);

      thirdServiceFormData.append("intent", this.thirdServiceIntentLetter);

      this.thirdServiceDocList.forEach((eachDoc: File, index) => {
        thirdServiceFormData.append('doc-Info' + index, eachDoc);
      })

      this.csService.placeCsOrder(thirdServiceFormData).subscribe((resp: any) => {

        if (resp.code === 1) {
          this.tostr.success("Place New Order", "Order Placed Successfully");
          window.location.reload();
        } else {
          this.tostr.error("Place New Order", resp.message);
        }
      })
    }
  }

  submitSecondServiceForm() {
    const companyName = this.secondServiceForm.controls['companyName'].value;
    const regNumber = this.secondServiceForm.controls['regNumber'].value;
    const description = this.secondServiceForm.controls['description'].value;

    if (companyName == "") {

    } else if (regNumber == "") {

    } else if (description == "") {

    } else {
      const secondServiceFormData = new FormData();

      const token: any = sessionStorage.getItem("authToken");
      const flag: any = sessionStorage.getItem("role");

      secondServiceFormData.append("token", token);
      secondServiceFormData.append("flag", flag);
      secondServiceFormData.append("serviceIndex", this.serviceIndex);
      secondServiceFormData.append("companyName", companyName);
      secondServiceFormData.append("regNumber", regNumber);
      secondServiceFormData.append("description", description);

      this.secondServiceDocs.forEach((eachDoc: File, index) => {
        secondServiceFormData.append('doc-Info' + index, eachDoc);
      })

      this.csService.placeCsOrder(secondServiceFormData).subscribe((resp: any) => {

        if (resp.code === 1) {
          this.tostr.success("Place New Order", "Order Placed Successfully");
        } else {
          this.tostr.error("Place New Order", resp.message);
        }
      })
    }
  }

  submitFirstServiceForm() {
    const companyName = this.firstServiceForm.controls['companyName'].value;
    const directorNames = this.firstServiceForm.controls['directorNames'].value;
    const directorAddress = this.firstServiceForm.controls['directorAddress'].value;
    const directorTelephones = this.firstServiceForm.controls['directorTelephones'].value;
    const directorEmails = this.firstServiceForm.controls['directorEmails'].value;
    const devisionNumber = this.firstServiceForm.controls['devisionNumber'].value;
    const devisionalSectrial = this.firstServiceForm.controls['devisionalSectrial'].value;
    const directorDistrict = this.firstServiceForm.controls['directorDistrict'].value;
    const nicNumberOfDirectors = this.firstServiceForm.controls['nicNumberOfDirectors'].value;

    if (companyName == "") {

    } else if (directorNames == "") {

    } else if (directorAddress == "") {

    } else if (directorTelephones == "") {

    } else if (directorEmails == "") {

    } else if (devisionNumber == "") {

    } else if (devisionalSectrial == "") {
      
    } else if (directorDistrict == "") {

    } else if (nicNumberOfDirectors == "") {

    } else {
      const firstServiceFormData = new FormData();

      const token: any = sessionStorage.getItem("authToken");
      const flag: any = sessionStorage.getItem("role");

      firstServiceFormData.append("token", token);
      firstServiceFormData.append("flag", flag);
      firstServiceFormData.append("serviceIndex", this.serviceIndex);
      firstServiceFormData.append("companyName", companyName);
      firstServiceFormData.append("directorNames", directorNames);
      firstServiceFormData.append("directorEmails", directorEmails);
      firstServiceFormData.append("directorAddress", directorAddress);
      firstServiceFormData.append("directorTelephones", directorTelephones);
      firstServiceFormData.append("devisionNumber", devisionNumber);
      firstServiceFormData.append("devisionalSectrial", devisionalSectrial);
      firstServiceFormData.append("directorDistrict", directorDistrict);
      firstServiceFormData.append("nicNumberOfDirectors", nicNumberOfDirectors);

      this.firstServiceNICImages.forEach((eachDoc: File, index) => {
        firstServiceFormData.append('nic-Info' + index, eachDoc);
      })

      this.firstServiceRequiredDocList.forEach((eachDoc: File, index) => {
        firstServiceFormData.append('doc-Info' + index, eachDoc);
      })

      this.csService.placeCsOrder(firstServiceFormData).subscribe((resp: any) => {

        if (resp.code === 1) {
          this.tostr.success("Place New Order", "Order Placed Successfully");
          window.location.reload(); 
        } else {
          this.tostr.error("Place New Order", resp.message);
        }
      })
    }
  }

  setIntentLetterForThirdService(event: any) {
    this.thirdServiceIntentLetter = event.target.files[0];
  } 

  setResignLetter(event: any) {
    this.forthServiceResignLetter = event.target.files[0];
  }

  onChangeRequiredFiles(event: any, index: number) {
    if (index == 1) {
      this.firstServiceRequiredDocList = Array.from(event.target.files);
    } else if (index == 2) {
      this.secondServiceDocs = Array.from(event.target.files);
    } else if (index == 3) {
      this.thirdServiceDocList = Array.from(event.target.files);
    } else if (index == 4) {
      this.forthServiceDocList = Array.from(event.target.files);
    } else if (index == 5) {
      this.fifthServiceDocList = Array.from(event.target.files);
    } else if (index == 6) {
      this.sixthServiceDocList = Array.from(event.target.files);
    } else if (index == 7) {
      this.seventhServiceDocList = Array.from(event.target.files);
    } else {

    }
  }

  onChangeNICImages(event: any, index: number) {
    if (index == 1) {
      this.firstServiceNICImages = Array.from(event.target.files);
    }
  }

  initFirstServiceForm() {
    this.firstServiceForm = this.formBuilder.group({
      companyName: ['' ,Validators.required],
      directorNames: ['', Validators.required],
      directorAddress: ['', Validators.required],
      directorTelephones: ['', Validators.required],
      directorEmails: ['', Validators.required],
      devisionNumber: ['', Validators.required],
      devisionalSectrial: ['' ,Validators.required],
      directorDistrict: ['', Validators.required],
      nicNumberOfDirectors: ['', Validators.required]
    })
  }

  initSecondServiceForm() {
    this.secondServiceForm = this.formBuilder.group({
      companyName: ['', Validators.required],
      regNumber: ['', Validators.required],
      description: ['', Validators.required],
    })
  }

  initThirdServiceForm() {
    this.thirdServiceForm = this.formBuilder.group({
      companyName: ['' ,Validators.required],
      directorNames: ['', Validators.required],
      directorAddress: ['', Validators.required],
      directorTelephones: ['', Validators.required],
      directorEmails: ['', Validators.required],
      devisionNumber: ['', Validators.required],
      devisionalSectrial: ['' ,Validators.required],
      directorDistrict: ['', Validators.required],
      nicNumberOfDirectors: ['', Validators.required],
      dateOfAppointment: ['', Validators.required]
    })
  }

  initForthServiceForm() {
    this.fourthServiceForm = this.formBuilder.group({
      companyName: ['' ,Validators.required],
      directorNames: ['', Validators.required],
      directorAddress: ['', Validators.required],
      directorTelephones: ['', Validators.required],
      directorEmails: ['', Validators.required],
      devisionNumber: ['', Validators.required],
      devisionalSectrial: ['' ,Validators.required],
      directorDistrict: ['', Validators.required],
      nicNumberOfDirectors: ['', Validators.required],
      dateOfResign: ['', Validators.required]
    })
  }

  initFifthServiceForm() {
    this.fifthServiceForm = this.formBuilder.group({
      companyName: ['', Validators.required],
      regNumber: ['', Validators.required],
      description: ['', Validators.required],
    })
  }

  initSixthServiceForm() {
    this.sixthServiceForm = this.formBuilder.group({
      companyName: ['', Validators.required],
      regNumber: ['', Validators.required],
      description: ['', Validators.required],
    })
  }

  initSevenServiceForm() {
    this.secondServiceForm = this.formBuilder.group({
      companyName: ['', Validators.required],
      regNumber: ['', Validators.required],
      description: ['', Validators.required],
    })
  }

  onClickOpenFormModal(index: number) {
    this.serviceIndex = index.toString();

    if (index == 1) {
      this.firstServiceFormModelOpen = true;
      this.secondServiceFormModalOpen = false;
      this.thirdServiceFormModalOpen = false;
      this.forthServiceFormModalOpen = false;
      this.fifthServiceFormModalOpen = false;
      this.sixthServiceFormModalOpen = false;
      this.sevenServiceFormModalOpen = false;
    } else if (index == 2) {
      this.firstServiceFormModelOpen = false;
      this.secondServiceFormModalOpen = true;
      this.thirdServiceFormModalOpen = false;
      this.forthServiceFormModalOpen = false;
      this.fifthServiceFormModalOpen = false;
      this.sixthServiceFormModalOpen = false;
      this.sevenServiceFormModalOpen = false;
    } else if (index == 3) {
      this.firstServiceFormModelOpen = false;
      this.secondServiceFormModalOpen = false;
      this.thirdServiceFormModalOpen = true;
      this.forthServiceFormModalOpen = false;
      this.fifthServiceFormModalOpen = false;
      this.sixthServiceFormModalOpen = false;
      this.sevenServiceFormModalOpen = false;
    } else if (index == 4) {
      this.firstServiceFormModelOpen = false;
      this.secondServiceFormModalOpen = false;
      this.thirdServiceFormModalOpen = false;
      this.forthServiceFormModalOpen = true;
      this.fifthServiceFormModalOpen = false;
      this.sixthServiceFormModalOpen = false;
      this.sevenServiceFormModalOpen = false;
    } else if (index == 5) {
      this.firstServiceFormModelOpen = false;
      this.secondServiceFormModalOpen = false;
      this.thirdServiceFormModalOpen = false;
      this.forthServiceFormModalOpen = false;
      this.fifthServiceFormModalOpen = true;
      this.sixthServiceFormModalOpen = false;
      this.sevenServiceFormModalOpen = false;
    } else if (index == 6) {
      this.firstServiceFormModelOpen = false;
      this.secondServiceFormModalOpen = false;
      this.thirdServiceFormModalOpen = false;
      this.forthServiceFormModalOpen = false;
      this.fifthServiceFormModalOpen = false;
      this.sixthServiceFormModalOpen = true;
      this.sevenServiceFormModalOpen = false;
    } else if (index == 7) {
      this.firstServiceFormModelOpen = false;
      this.secondServiceFormModalOpen = false;
      this.thirdServiceFormModalOpen = false;
      this.forthServiceFormModalOpen = false;
      this.fifthServiceFormModalOpen = false;
      this.sixthServiceFormModalOpen = false;
      this.sevenServiceFormModalOpen = true;
    } else {
      this.firstServiceFormModelOpen = false;
      this.secondServiceFormModalOpen = false;
      this.thirdServiceFormModalOpen = false;
      this.forthServiceFormModalOpen = false;
      this.fifthServiceFormModalOpen = false;
      this.sixthServiceFormModalOpen = false;
      this.sevenServiceFormModalOpen = false;
    }
  }

}
