import { Component, ElementRef, EventEmitter, OnInit, Output, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DataShareService } from 'src/app/services/data/data-share.service';
import { NotaryService } from 'src/app/services/notary/notary.service';
import { NotaryServicePerson } from 'src/app/shared/models/NotaryServicePerson/notary-service-person';
import { NotaryServicePersonList } from 'src/app/shared/models/NotaryServicePersonList/notary-service-person-list';
import { NotaryServiceSecondStep } from 'src/app/shared/models/NotaryServiceSecondStep/notary-service-second-step';
import { Request } from 'src/app/shared/models/Request/request';
//import { NgbModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-notary-service-step-03',
  templateUrl: './notary-service-step-03.component.html',
  styleUrls: ['./notary-service-step-03.component.css']
})
export class NotaryServiceStep03Component implements OnInit {

  @ViewChild('exampleModal') modal!: ElementRef ;
  @Output() closeModalEvent = new EventEmitter<boolean>();
  
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
  isModalOpen: boolean = false;
  nicImagePreviews: string[] = [];
  passportImagePreviews: string[] = [];
  drivingLicenseImagePreviews: string[] = [];
  adultIdImagePreviews: string[] = [];
  birthCertificateImagePreviews: string[] = [];
  marriageCertificateImagePreviews: string[] = [];

  nicImageFile: string[] = [];
  passportImageFile: string[] = [];
  drivingLicenseImageFile: string[] = [];
  adultIdImageFile: string[] = [];
  birthCertificateImageFile: string[] = [];
  marriageCertificateImageFile: string[] = [];

  currentPerson: NotaryServicePerson | null = null;
  notaryServicePeople: NotaryServicePerson[] = [];

  constructor(private formBuilder: FormBuilder, private router: Router, private dataShareService: DataShareService
            , private notaryService: NotaryService, private tostr: ToastrService, private spinner: NgxSpinnerService, private renderer: Renderer2,  private el: ElementRef) {}

  ngOnInit(): void {
    this.initAddPersonForm();
    
    this.dataShareService.getComponentValueObj().subscribe((data: NotaryServiceSecondStep) => {
      this.secondStepData = data;
      
    })
  }

  onClickPrevButton() {
    this.router.navigate(['/app/select-services/notary-service/step-02']);
  }

  onClickSaveProcess() {
    this.spinner.show();
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
    this.requestParamModel.secDeposit = this.addedPersonList.secondStepData.secdeposit;
    this.requestParamModel.notaryServicePersonList = this.addedPersonList.notaryPerson;

    this.notaryService.placeNotaryServiceOrder(this.requestParamModel).subscribe((resp: any) => {

      if (resp.code === 1) {
        this.spinner.hide();
       // this.tostr.success("Place Notary Servuice Order", "Order Placed Successfully");
       this.showSuccessModal();
      } else {
        this.tostr.error("Place Notary Servuice Order", resp.message);
      }
    })
  }

  showSuccessModal() {
    const modalElement = this.el.nativeElement.querySelector('#statusSuccessModal');
    if (modalElement) {
      this.renderer.addClass(modalElement, 'show');
      this.renderer.setStyle(modalElement, 'display', 'block');
      this.renderer.setStyle(modalElement, 'backgroundColor', 'rgba(0, 0, 0, 0.5)');
    }
  }
  
  redirectToAnotherForm() {
    const modalElement = this.el.nativeElement.querySelector('#statusSuccessModal');
    if (modalElement) {
      this.renderer.removeClass(modalElement, 'show');
      this.renderer.setStyle(modalElement, 'display', 'none');
      this.renderer.removeStyle(modalElement, 'backgroundColor');
      this.router.navigate(['app/notary-order-requests'])
     // this.lgForm.reset();
    }
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

    /*if (category == "1") {
      this.personCategory = "තෑගි දීමනාකරු / Donor";
    } else if (category == "2") {
      this.personCategory = "තෑගි ලැබුම්කරු / Donee";
    } else if (category == "3") {
      this.personCategory = "ණය හිමියා / Lender";
    } else if (category == "4") {
      this.personCategory = "ණය ගැතියා / the borrower";
    }else if (category == "5") {
      this.personCategory = "විකුණුම්කරු / the Vendor";
    } 
    else if (category == "6") {
      this.personCategory = "ගැණුම්කරු / the Vendee";
    } 
    else if (category == "7") {
      this.personCategory = "බද දීමනාකරු / Lessor";
    } 
    else if (category == "8") {
      this.personCategory = "බද ගැනුම්කරු / Lessee";
    } 
    else if (category == "9") {
      this.personCategory = "ප්‍රකාශක / Declaran";
    }  
    else {

    }*/

    if (category === "1") {
      this.personCategory = "තෑගි දීමනාකරු / Donor";
  } else if (category === "2") {
      this.personCategory = "තෑගි ලැබුම්කරු / Donee";
  } else if (category === "3") {
      this.personCategory = "ණය හිමියා / Lender";
  } else if (category === "4") {
      this.personCategory = "ණය ගැතියා / the borrower";
  } else if (category === "5") {
      this.personCategory = "විකුණුම්කරු / the Vendor";
  } else if (category === "6") {
      this.personCategory = "ගැණුම්කරු / the Vendee";
  } else if (category === "7") {
      this.personCategory = "බද දීමනාකරු / Lessor";
  } else if (category === "8") {
      this.personCategory = "බද ගැනුම්කරු / Lessee";
  } else if (category === "9") {
      this.personCategory = "ප්‍රකාශක / Declaran";
  } else if (category === "10") {
      this.personCategory = "අයිතිකරු / the owner";
  } else if (category === "11") {
      this.personCategory = "ජීවිත බුක්තිකරු / Life Interest Holder";
  } else if (category === "12") {
      this.personCategory = "අයදුම්කරු / The applicant";
  } else if (category === "13") {
      this.personCategory = "බල පැවරුම් කරු / Assignee";
  } else if (category === "14") {
      this.personCategory = "ඇටෝර්නි දීමනාකරු / Grantor of Attorney / Principal";
  } else if (category === "15") {
      this.personCategory = "ඇටෝර්නි ලැබුම්කරු / Attorney Holder";
  } else if (category === "16") {
      this.personCategory = "පසු අයිතිකරුගේ / of subsequent owner";
  } else if (category === "17") {
      this.personCategory = "අන්තිම කැමතිපත්‍ර දීමනාකරු / The Testator";
  } else if (category === "18") {
      this.personCategory = "අන්තිම කැමතිපත්‍ර ලැබුම්කරු / The beneficiary";
  } else if (category === "19") {
      this.personCategory = "සාක්ෂිකරු / the witness";
  } else if (category === "20") {
      this.personCategory = "බාලවයස්කරු / the minor";
  } else if (category === "21") {
      this.personCategory = "මරණකරු / the Deceased";
  } else if (category === "22") {
      this.personCategory = "ස්වාමිපුරුශයා / the husband";
  } else if (category === "23") {
      this.personCategory = "කාලත්‍රයා / spouse";
  } else if (category === "24") {
      this.personCategory = "ස්වාමිපුරුශයා / the husband";
  } else if (category === "25") {
      this.personCategory = "බිරිද / wife";
  } else if (category === "26") {
      this.personCategory = "මව / Mother";
  } else if (category === "27") {
      this.personCategory = "පියා / the father";
  } else if (category === "28") {
      this.personCategory = "දරුවා / child";
  } else if (category === "29") {
      this.personCategory = "සහෝදරයා / brother";
  } else if (category === "30") {
      this.personCategory = "සහෝදරිය / sister";
  } else if (category === "31") {
      this.personCategory = "ඥාතියා / the relative";
  } else if (category === "32") {
      this.personCategory = "හිතවතා / Dear";
  } else if (category === "33") {
      this.personCategory = "පූජ්‍ය පක්ෂය / The clergy";
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
    }/* else if (nicNumber == "") {
      this.tostr.error("Empty Feilds Found", "NIC Number is required.");
    } else if (passport == "") {
      this.tostr.error("Empty Feilds Found", "Passport is required.");
    } else if (drivingLic == "") {
      this.tostr.error("Empty Feilds Found", "Driving Licence is required.");
    } else if (adultNic == "") {
      this.tostr.error("Empty Feilds Found", "Adult NIC is required.");
    } else if (bcNumber == "") {
      this.tostr.error("Empty Feilds Found", "Birth Certificate Number is required.");
    } else if (mcNumber == "") {
      this.tostr.error("Empty Feilds Found", "MC Number is required.");
    } */else if (natureOfSig == "") {
      this.tostr.error("Empty Feilds Found", "Nature Of Signing is required.");
    } else if (phoneNumber == "") {
      this.tostr.error("Empty Feilds Found", "Phone Number is required.");
    }/* else if (email == "") {
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

      console.log('nic',this.nicImageFile);
      this.nicImageFile.forEach((base64String: string) => {
        
        notaryServicePersonObj.nicImage.push(base64String);
      });

      this.passportImageFile.forEach((base64String: string) => {
        
        notaryServicePersonObj.passportImage.push(base64String);
      });

      this.drivingLicenseImageFile.forEach((base64String: string) => {
        
        notaryServicePersonObj.drivingLicImage.push(base64String);
      });

      this.adultIdImageFile.forEach((base64String: string) => {
        
        notaryServicePersonObj.adultNicImage.push(base64String);
      });

      this.birthCertificateImageFile.forEach((base64String: string) => {
        
        notaryServicePersonObj.bcNumberImage.push(base64String);
      });

      this.marriageCertificateImageFile.forEach((base64String: string) => {
        
        notaryServicePersonObj.mcNumberImage.push(base64String);
      });


    
     // notaryServicePersonObj.natureOfSignature = natureOfSig;
      notaryServicePersonObj.phoneNumber = phoneNumber;
      notaryServicePersonObj.email = email;
      console.log('file anme',notaryServicePersonObj);
      this.addedPersonList.notaryPerson.push(notaryServicePersonObj);
      this.addPersonForm.reset();
      this.initAddPersonForm();
      this.nicImagePreviews = [];
      this.passportImagePreviews = [];
      this.drivingLicenseImagePreviews = [];
      this.adultIdImagePreviews = [];
      this.birthCertificateImagePreviews = [];
      this.marriageCertificateImagePreviews = [];
      this.naturesignatureDoc = [];
     // this.modalService.dismissAll(); 
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

  
  onFilesSelected(event: any, field: string) {
    const files = event.target.files;
    const previewArray = this.getPreviewArray(field);
   
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          previewArray.push(e.target.result);  
          this.setPreviewArray(field, previewArray);
        };
        reader.readAsDataURL(files[i]);
      }
    }
  }

  setPreviewArray(field: string, previewArray: string[]) {
    switch (field) {
      case 'nic':
        this.nicImageFile = previewArray;
        break;
      case 'passport':
        this.passportImageFile = previewArray;
        break;
      case 'drivingLicense':
        this.drivingLicenseImageFile = previewArray;
        break;
      case 'adultId':
        this.adultIdImageFile = previewArray;
        break;
      case 'birthCertificate':
        this.birthCertificateImageFile = previewArray;
        break;
      case 'marriageCertificate':
        this.marriageCertificateImageFile = previewArray;
        break;
      default:
        break;
    }
  }

  // Function to get the correct preview array based on the field
  getPreviewArray(field: string): string[] {
    console.log('array',field ,'array')
    switch (field) {
      case 'nic': return this.nicImagePreviews;
      case 'passport': return this.passportImagePreviews;
      case 'drivingLicense': return this.drivingLicenseImagePreviews;
      case 'adultId': return this.adultIdImagePreviews;
      case 'birthCertificate': return this.birthCertificateImagePreviews;
      case 'marriageCertificate': return this.marriageCertificateImagePreviews;
      
      default: return [];
    }
    
  }

  
  removeImage(field: string, index: number) {
    const previewArray = this.getPreviewArray(field);
    previewArray.splice(index, 1); 
  }
  
  onCheckClick(person: NotaryServicePerson) {
    this.currentPerson = person; 
    this.showModal();
  }
  
  showModal() {
    const modalElement = this.el.nativeElement.querySelector('#viewUploadedDataModal');
    if (modalElement) {
      this.renderer.addClass(modalElement, 'show');
      this.renderer.setStyle(modalElement, 'display', 'block');
      this.renderer.setStyle(modalElement, 'backgroundColor', 'rgba(0, 0, 0, 0.5)');
    }
  }

  closeModal() {
    const modalElement = this.el.nativeElement.querySelector('#viewUploadedDataModal');
    if (modalElement) {
      this.renderer.removeClass(modalElement, 'show');
      this.renderer.setStyle(modalElement, 'display', 'none');
      this.renderer.removeStyle(modalElement, 'backgroundColor');
    }
  }

  removePerson() {
    if (this.currentPerson) {
      
     
        this.removePersonFromList(this.currentPerson); 
        this.closeModal(); 
    
    }
  }
  removePersonFromList(person: NotaryServicePerson) {
    
    const index = this.addedPersonList.notaryPerson.indexOf(person);
    
   
    if (index !== -1) {
      this.addedPersonList.notaryPerson.splice(index, 1);
      this.initAddPersonForm();
     
    }
  }
}
