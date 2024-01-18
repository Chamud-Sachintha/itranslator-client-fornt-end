import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataShareService } from 'src/app/services/data/data-share.service';
import { NotaryService } from 'src/app/services/notary/notary.service';
import { MainNotaryCategory } from 'src/app/shared/models/MainNotaryCategory/main-notary-category';
import { NotaryServiceFirstStep } from 'src/app/shared/models/NotaryServiceFirstStep/notary-service-first-step';
import { SearchParam } from 'src/app/shared/models/SearchParam/search-param';
import { SubNotaryCategory } from 'src/app/shared/models/SubNotaryCategory/sub-notary-category';

@Component({
  selector: 'app-notary-service-step-01',
  templateUrl: './notary-service-step-01.component.html',
  styleUrls: ['./notary-service-step-01.component.css']
})
export class NotaryServiceStep01Component implements OnInit {

  basicInfoForm!: FormGroup;
  firstStepModel = new NotaryServiceFirstStep();
  searchParamModel= new SearchParam();
  mainNotaryCategoryList: MainNotaryCategory[] = [];
  subCategoryList: SubNotaryCategory[] = [];

  constructor(private dataShareService: DataShareService, private router: Router, private formBuilder: FormBuilder
            , private notaryService: NotaryService, private tostr: ToastrService) {}

  ngOnInit(): void {
    this.initBasicInfoForm();
    this.loadMainNotaryCategoryList();
  }

  onChangeMainCategory(mainCategoryId: string) {
    this.searchParamModel.token = sessionStorage.getItem("authToken");
    this.searchParamModel.flag = sessionStorage.getItem("role");
    this.searchParamModel.mainCategoryCode = mainCategoryId;

    this.notaryService.getSubCatListByMainCategory(this.searchParamModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        dataList.data[0].forEach((eachCategory: SubNotaryCategory) => {
          this.subCategoryList.push(eachCategory);
        })
      }
    })
  }

  loadMainNotaryCategoryList() {
    this.searchParamModel.token = sessionStorage.getItem("authToken");
    this.searchParamModel.flag = sessionStorage.getItem("role");

    this.notaryService.getMainCategoryList(this.searchParamModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        dataList.data[0].forEach((eachCategory: MainNotaryCategory) => {
          this.mainNotaryCategoryList.push(eachCategory);
        })
      }
    })
  }

  initBasicInfoForm() {
    this.basicInfoForm = this.formBuilder.group({
      mainCategory: ['', Validators.required],
      subCategory: ['', Validators.required],
      description: ['', Validators.required],
    })
  }

  onSubmitBasicInfoForm() {

    const mainCategory = this.basicInfoForm.controls['mainCategory'].value;
    const subCategory = this.basicInfoForm.controls['subCategory'].value;
    const description = this.basicInfoForm.controls['description'].value;

    if (mainCategory == "") {
      this.tostr.error("Empty Feilds Found", "Main Category Is Required.");
    } else if (subCategory == "") {
      this.tostr.error("Empty Feilds Found", "Sub Category Is Required.");
    } else if (description == "") {
      this.tostr.error("Empty Feilds Found", "Description Is Required.");
    } else {
      this.firstStepModel.mainCategory = mainCategory;
      this.firstStepModel.subCategory = subCategory;
      this.firstStepModel.descriptionOfService = description;

      this.dataShareService.setComponentValueObj(this.firstStepModel);
      this.router.navigate(['app/select-services/notary-service/step-02'])
    }
  }

}
