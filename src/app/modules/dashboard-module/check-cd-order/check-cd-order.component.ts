import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NotaryService } from 'src/app/services/notary/notary.service';
import { NotaryDocument } from 'src/app/shared/models/NotaryDocument/notary-document';
import { Request } from 'src/app/shared/models/Request/request';
import { environment } from 'src/environments/environment.development';
import { AdminMessage } from 'src/app/shared/models/AdminMessage/admin-message';
import { Subscription, switchMap, timer } from 'rxjs';
import { CsService } from 'src/app/services/cs/cs.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-check-cd-order',
  templateUrl: './check-cd-order.component.html',
  styleUrls: ['./check-cd-order.component.css']
})
export class CheckCdOrderComponent {

  /*companyDetails = {
    name: 'testcomapny',
    directorsNames: 'testmanager',
    directorsAddresses: '123re',
    directorsPhoneNumbers: '012345679',
    directorsEmails: 'testgmail.com',
    villageOfficerDivision: '55',
    divisionalSecretariat: 'efwe',
    district: 'bmbkl',
    nationalIDAndSignatures: '123456789'
  };*/


  requestParamModel = new Request();
  subscription!: Subscription;
  adminLessageList: AdminMessage[] = [];
  UserName: string | null = '';
  showDocuments: any[] = [];
  notaryDocList: NotaryDocument[] = [];
  totalOrderAmount!: number;
  bankSlip!: string;
  uploadedBankSlip = null;
  invoiceNo!: string;
  InNo!: number;
  Pickupdate! : String;
  submissionDate!: String;
  mailingDate!: String
  registrationDate!: String;
  driscriptionofservices!: number;
  pendingpayment!: String;
  paymentStatus!: number;
  service_index!: number;

  companyDetails: any[] = [];
  
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

  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private notaryService: NotaryService, private tostr: ToastrService, private csService: CsService, private renderer: Renderer2,  private el: ElementRef, private spinner: NgxSpinnerService) 
  {
    this.firstServiceForm = this.formBuilder.group({
      companyName: ['', Validators.required],
      directorNames: ['', Validators.required],
      directorAddress: ['', Validators.required],
      directorTelephones: ['', Validators.required],
      directorEmails: ['', Validators.required],
      devisionNumber: ['', Validators.required],
      devisionalSectrial: ['', Validators.required],
      directorDistrict: ['', Validators.required],
      nicNumberOfDirectors: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.invoiceNo = this.activatedRoute.snapshot.params['invoiceNo'];
    this.InNo = this.activatedRoute.snapshot.params['additionalParam'];
    console.log('regwe>>',this.InNo);
    this.loadcsOrderInfo();
    this.loadcsOrderDetails();
    /*this.getTranslatedOrderDocs();*/
    this.UserName = sessionStorage.getItem("username");
    this.requestParamModel.token = sessionStorage.getItem("authToken");
    this.requestParamModel.flag = sessionStorage.getItem("role");

    /*this.subscription = timer(0, 30000).pipe(

      switchMap(() => this.notaryService.getOrderAdminMessageList(this.requestParamModel))

    ).subscribe((result: any) => {
      this.adminLessageList = [];
      const data = JSON.parse(JSON.stringify(result))

      data.data[0].forEach((eachData: AdminMessage) => {
        const formatedDate = parseInt(eachData.time) * 1000;
        eachData.time = formatedDate.toString();

        this.adminLessageList.push(eachData);
      })
    });*/
  }

  uploadBankSlip() {
    this.requestParamModel.token = sessionStorage.getItem("authToken");
    this.requestParamModel.flag = sessionStorage.getItem("role");
    this.requestParamModel.invoiceNo = this.invoiceNo;
    
    if (this.uploadedBankSlip != null) {
      this.convertImageToBase64(this.uploadedBankSlip).then((base64String) => {
        this.requestParamModel.bankSlip = base64String;
      }).then(() => {
        this.notaryService.submitBankSlip(this.requestParamModel).subscribe((resp: any) => {
          
          if (resp.code === 1) {
            this.tostr.success("Upload Bank Slip", "Bank Slip U[plpaded successfully");
          } else {
            this.tostr.error("Uplaod Bank Slip", resp.message);
          }
        })
      })
    }
  }

  onChangeBankSlip(event: any) {
    this.uploadedBankSlip = event.target.files[0];
  }

  onClickUpdateOrderStatus(orderStatus: string) {
    this.requestParamModel.token = sessionStorage.getItem("authToken");
    this.requestParamModel.flag = sessionStorage.getItem("role");
    this.requestParamModel.invoiceNo = this.invoiceNo;
    this.requestParamModel.orderStatus = orderStatus;
    
    this.csService.updateNotaryOrderStatus(this.requestParamModel).subscribe((resp: any) => {

      if (resp.code === 1) {
        this.tostr.success("Update Order Status", "Order Status Updated Successfully.");
      } else {
        this.tostr.error("Update Order Status", resp.message);
      }
    })
  }

  onClickViewDocument(documentName: string) {
    const filePath = environment.fileServerURL + "notary_docs/" + documentName;
    window.open(filePath);
  }

  getTranslatedOrderDocs() {
    this.requestParamModel.token = sessionStorage.getItem("authToken");
    this.requestParamModel.flag = sessionStorage.getItem("role");
    this.requestParamModel.invoiceNo = this.invoiceNo;

    this.notaryService.getNotaryDocuments(this.requestParamModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        dataList.data[0].forEach((eachDoc: NotaryDocument) => {
          this.notaryDocList.push(eachDoc);
        })
      }
    })
  }

  onClickViewImage(imageName: string) {

  }

  

  loadcsOrderInfo() {
    this.requestParamModel.token = sessionStorage.getItem("authToken");
    this.requestParamModel.flag = sessionStorage.getItem("role");
    this.requestParamModel.invoiceNo = this.invoiceNo;

    this.csService.getcsOrderByInvoice(this.requestParamModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        this.Pickupdate= dataList.data[0].dateOfPicking;
        this.submissionDate= dataList.data[0].dateOfSubmission;
        this.mailingDate= dataList.data[0].dateOfMailing;
        this.registrationDate= dataList.data[0].dateOfRegistration;
        this.totalOrderAmount = dataList.data[0].totalAmount;
        if (dataList.data[0]?.descriptionOfService == null) {
          this.driscriptionofservices = 0;
      } else {
          this.driscriptionofservices = dataList.data[0]?.descriptionOfService;
      }
       // this.driscriptionofservices = dataList.data[0]?.descriptionOfService;
        this.pendingpayment = dataList.data[0].amountInArreas;
      }
    })
  }

  loadcsOrderDetails() {
    this.requestParamModel.token = sessionStorage.getItem("authToken");
    this.requestParamModel.flag = sessionStorage.getItem("role");
    this.requestParamModel.invoiceNo = this.invoiceNo;

    this.csService.getcsOrderByDetails(this.requestParamModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
       
        this.service_index = dataList.data[0].service_index;

        if(this.service_index == 1)
          { 
            const dataList2 = JSON.parse(JSON.stringify(resp.token));
            this.firstServiceForm.patchValue({
              companyName: dataList2[0]['companyName'],
              directorNames: dataList2[1]['directorName'],
              directorAddress: dataList2[2]['directorAddress'],
              directorTelephones: dataList2[3]['directorTelephone'],
              directorEmails: dataList2[4]['directorEmail'],
              devisionNumber: dataList2[5]['devisionNumber'],
              devisionalSectrial: dataList2[6]['devisionalSectrial'],
              directorDistrict: dataList2[7]['directorDistrict'],
              nicNumberOfDirectors: dataList2[8]['nicNumberOfDirectors'],
            });
            console.log('formdata>>>', dataList2);
          }
          else if( this.service_index == 2)
            {
              const dataList2 = JSON.parse(JSON.stringify(resp.token));
              this.secondServiceForm = this.formBuilder.group({
                companyName: dataList2[0]['companyName'],
                regNumber: dataList2[1]['regNumber'],
                description: dataList2[2]['description'],
              })
            }
         else if( this.service_index == 3)
            {
              const dataList2 = JSON.parse(JSON.stringify(resp.token));
              this.thirdServiceForm = this.formBuilder.group({
                companyName: dataList2[0]['companyName'],
                directorNames: dataList2[1]['directorNames'],
                directorAddress: dataList2[2]['directorAddress'],
                directorTelephones: dataList2[3]['directorTelephones'],
                directorEmails:dataList2[4]['directorEmails'],
                devisionNumber: dataList2[5]['devisionNumber'],
                devisionalSectrial: dataList2[6]['devisionalSectrial'],
                directorDistrict:dataList2[7]['directorDistrict'],
                nicNumberOfDirectors: dataList2[8]['nicNumberOfDirectors'],
                dateOfAppointment: dataList2[9]['dateOfAppointment'],
              })
            }
        else if( this.service_index == 4)
            {
              const dataList2 = JSON.parse(JSON.stringify(resp.token));
              this.fourthServiceForm = this.formBuilder.group({
                companyName: dataList2[0]['companyName'],
                directorNames: dataList2[1]['directorNames'],
                directorAddress: dataList2[2]['directorAddress'],
                directorTelephones: dataList2[3]['directorTelephones'],
                directorEmails:dataList2[4]['directorEmails'],
                devisionNumber: dataList2[5]['devisionNumber'],
                devisionalSectrial: dataList2[6]['devisionalSectrial'],
                directorDistrict:dataList2[7]['directorDistrict'],
                nicNumberOfDirectors: dataList2[8]['nicNumberOfDirectors'],
                dateOfResign: dataList2[9]['dateOfResign'],
              })
            }
        else if( this.service_index == 5)
          {
            const dataList2 = JSON.parse(JSON.stringify(resp.token));
            this.fifthServiceForm = this.formBuilder.group({
              companyName:dataList2[0]['companyName'],
              regNumber: dataList2[1]['regNumber'],
              description: dataList2[2]['description'],
            })
          }
        else if( this.service_index == 6)
          {
            const dataList2 = JSON.parse(JSON.stringify(resp.token));
            this.sixthServiceForm = this.formBuilder.group({
              companyName: dataList2[0]['companyName'],
              regNumber: dataList2[2]['regNumber'],
              description: dataList2[3]['description'],
            })
          }
       else if( this.service_index == 7)
          {
            const dataList2 = JSON.parse(JSON.stringify(resp.token));
            this.sevenServiceForm = this.formBuilder.group({
              companyName: dataList2[0]['companyName'],
              regNumber: dataList2[1]['regNumber'],
              description: dataList2[2]['description'],
            })
          }
       
      }
    })
  }

    /*loadcsOrderDetails() {
      this.requestParamModel.token = sessionStorage.getItem("authToken");
      this.requestParamModel.flag = sessionStorage.getItem("role");
      this.requestParamModel.invoiceNo = this.invoiceNo;
  
      this.csService.getcsOrderByDetails(this.requestParamModel).subscribe((resp: any) => {
          const dataList = JSON.parse(JSON.stringify(resp));
  
          if (resp.code === 1) {
              this.service_index = dataList.data[0].service_index;
              const dataList2 = JSON.parse(JSON.stringify(resp.token));
  
              // Call a helper function to populate the form
              this.populateFormBasedOnServiceIndex(this.service_index, dataList2);
          }
      });
  }*/

  populateFormBasedOnServiceIndex(serviceIndex: number, dataList2: any) {
    console.log('Service Index:', serviceIndex); // Log serviceIndex to verify
    console.log('DataList2:', dataList2); // Log dataList2 structure

    // Ensure we are processing the data correctly based on serviceIndex
    switch (serviceIndex) {
        case 1:
            // Map the dataList2 keys to the form values dynamically
            this.firstServiceForm.patchValue({
                companyName: dataList2[0]?.companyName,
                directorNames: dataList2[1]?.directorName,
                directorAddress: dataList2[2]?.directorAddress,
                directorTelephones: dataList2[3]?.directorTelephone,
                directorEmails: dataList2[4]?.directorEmail,
                devisionNumber: dataList2[5]?.devisionNumber,
                devisionalSectrial: dataList2[6]?.devisionalSectrial,
                directorDistrict: dataList2[7]?.directorDistrict,
                nicNumberOfDirectors: dataList2[8]?.nicNumberOfDirectors,
            });
            break;
        case 2:
            this.secondServiceForm = this.formBuilder.group({
                companyName: dataList2[0]?.companyName,
                regNumber: dataList2[1]?.regNumber,
                description: dataList2[2]?.description,
            });
            break;
        case 3:
            this.thirdServiceForm = this.formBuilder.group({
                companyName: dataList2[0]?.companyName,
                directorNames: dataList2[1]?.directorNames,
                directorAddress: dataList2[2]?.directorAddress,
                directorTelephones: dataList2[3]?.directorTelephones,
                directorEmails: dataList2[4]?.directorEmails,
                devisionNumber: dataList2[5]?.devisionNumber,
                devisionalSectrial: dataList2[6]?.devisionalSectrial,
                directorDistrict: dataList2[7]?.directorDistrict,
                nicNumberOfDirectors: dataList2[8]?.nicNumberOfDirectors,
                dateOfAppointment: dataList2[9]?.dateOfAppointment,
            });
            break;
        case 4:
            this.fourthServiceForm = this.formBuilder.group({
                companyName: dataList2[0]?.companyName,
                directorNames: dataList2[1]?.directorNames,
                directorAddress: dataList2[2]?.directorAddress,
                directorTelephones: dataList2[3]?.directorTelephones,
                directorEmails: dataList2[4]?.directorEmails,
                devisionNumber: dataList2[5]?.devisionNumber,
                devisionalSectrial: dataList2[6]?.devisionalSectrial,
                directorDistrict: dataList2[7]?.directorDistrict,
                nicNumberOfDirectors: dataList2[8]?.nicNumberOfDirectors,
                dateOfResign: dataList2[9]?.dateOfResign,
            });
            break;
        case 5:
            this.fifthServiceForm = this.formBuilder.group({
                companyName: dataList2[0]?.companyName,
                regNumber: dataList2[1]?.regNumber,
                description: dataList2[2]?.description,
            });
            break;
        case 6:
            this.sixthServiceForm = this.formBuilder.group({
                companyName: dataList2[0]?.companyName,
                regNumber: dataList2[2]?.regNumber,
                description: dataList2[3]?.description,
            });
            break;
        case 7:
            this.sevenServiceForm = this.formBuilder.group({
                companyName: dataList2[0]?.companyName,
                regNumber: dataList2[1]?.regNumber,
                description: dataList2[2]?.description,
            });
            break;
        default:
            console.log("Service Index not found for:", serviceIndex);
            break;
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
  
  sendOrderMessageToAdmin(message: string) {
    this.requestParamModel.token = sessionStorage.getItem("authToken");
    this.requestParamModel.flag = sessionStorage.getItem("role");
    this.requestParamModel.message = message;
    this.requestParamModel.invoiceNo = this.invoiceNo;

    this.notaryService.sendOrderMessageToAdmin(this.requestParamModel).subscribe((resp: any) => {

      if (resp.code === 1) {
        
      }
    })
  }

  CheckPayments(){
    this.loadcsOrderDetails();
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
    this.sevenServiceForm = this.formBuilder.group({
      companyName: ['', Validators.required],
      regNumber: ['', Validators.required],
      description: ['', Validators.required],
    })
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

  setIntentLetterForThirdService(event: any) {
    this.thirdServiceIntentLetter = event.target.files[0];
  } 

  setResignLetter(event: any) {
    this.forthServiceResignLetter = event.target.files[0];
  }

  submitFirstServiceForm(){
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
      firstServiceFormData.append("invoiceNo", this.invoiceNo);
      firstServiceFormData.append("serviceIndex", this.service_index.toString());
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

      this.csService.placeCsOrderUpdate(firstServiceFormData).subscribe((resp: any) => {

        if (resp.code === 1) {
          this.tostr.success("Place New Order", "Order Placed Successfully");
          window.location.reload(); 
        } else {
          this.tostr.error("Place New Order", resp.message);
        }
      })
    }
  }

  submitSecondServiceForm(){
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
      secondServiceFormData.append("invoiceNo", this.invoiceNo);
      secondServiceFormData.append("serviceIndex", this.service_index.toString());
      secondServiceFormData.append("companyName", companyName);
      secondServiceFormData.append("regNumber", regNumber);
      secondServiceFormData.append("description", description);

      this.secondServiceDocs.forEach((eachDoc: File, index) => {
        secondServiceFormData.append('doc-Info' + index, eachDoc);
      })

      this.csService.placeCsOrderUpdate(secondServiceFormData).subscribe((resp: any) => {

        if (resp.code === 1) {
          this.tostr.success("Place New Order", "Order Placed Successfully");
        } else {
          this.tostr.error("Place New Order", resp.message);
        }
      })
    }
  }

  submitThirdServiceForm(){
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
      thirdServiceFormData.append("invoiceNo", this.invoiceNo);
      thirdServiceFormData.append("serviceIndex", this.service_index.toString());
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

      this.csService.placeCsOrderUpdate(thirdServiceFormData).subscribe((resp: any) => {

        if (resp.code === 1) {
          this.tostr.success("Place New Order", "Order Placed Successfully");
          window.location.reload();
        } else {
          this.tostr.error("Place New Order", resp.message);
        }
      })
    }
  }

  submitForthServiceForm(){
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
      forthServiceFormData.append("invoiceNo", this.invoiceNo);
      forthServiceFormData.append("serviceIndex", this.service_index.toString());
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

      this.csService.placeCsOrderUpdate(forthServiceFormData).subscribe((resp: any) => {

        if (resp.code === 1) {
          this.tostr.success("Place New Order", "Order Placed Successfully");

        } else {
          this.tostr.error("Place New Order", resp.message);
        }
      })
    }
  }

  submitFifthServiceForm(){
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
      fifthServiceFormData.append("invoiceNo", this.invoiceNo);
      fifthServiceFormData.append("serviceIndex", this.service_index.toString());
      fifthServiceFormData.append("companyName", companyName);
      fifthServiceFormData.append("regNumber", regNumber);
      fifthServiceFormData.append("description", description);

      this.fifthServiceDocList.forEach((eachDoc: File, index) => {
        fifthServiceFormData.append('doc-Info' + index, eachDoc);
      })

      this.csService.placeCsOrderUpdate(fifthServiceFormData).subscribe((resp: any) => {

        if (resp.code === 1) {
          this.tostr.success("Place New Order", "Order Placed Successfully");
          window.location.reload();
        } else {
          this.tostr.error("Place New Order", resp.message);
        }
      })
    }
  }

  submitSixthServiceForm(){
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
      sixthServiceFormData.append("invoiceNo", this.invoiceNo);
      sixthServiceFormData.append("serviceIndex", this.service_index.toString());
      sixthServiceFormData.append("companyName", companyName);
      sixthServiceFormData.append("regNumber", regNumber);
      sixthServiceFormData.append("description", description);

      this.sixthServiceDocList.forEach((eachDoc: File, index) => {
        sixthServiceFormData.append('doc-Info' + index, eachDoc);
      })

      this.csService.placeCsOrderUpdate(sixthServiceFormData).subscribe((resp: any) => {

        if (resp.code === 1) {
          this.tostr.success("Place New Order", "Order Placed Successfully");
          window.location.reload();
        } else {
          this.tostr.error("Place New Order", resp.message);
        }
      })
    }
  }

  submitSeventhServiceForm(){
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
      seventhServiceFormData.append("invoiceNo", this.invoiceNo);
      seventhServiceFormData.append("serviceIndex", this.service_index.toString());
      seventhServiceFormData.append("companyName", companyName);
      seventhServiceFormData.append("regNumber", regNumber);
      seventhServiceFormData.append("description", description);

      this.seventhServiceDocList.forEach((eachDoc: File, index) => {
        seventhServiceFormData.append('doc-Info' + index, eachDoc);
      })

      this.csService.placeCsOrderUpdate(seventhServiceFormData).subscribe((resp: any) => {

        if (resp.code === 1) {
          this.tostr.success("Place New Order", "Order Placed Successfully");
          window.location.reload();
        } else {
          this.tostr.error("Place New Order", resp.message);
        }
      })
    }
  }

}
