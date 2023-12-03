import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadRequiredDocsComponent } from './upload-required-docs.component';

describe('UploadRequiredDocsComponent', () => {
  let component: UploadRequiredDocsComponent;
  let fixture: ComponentFixture<UploadRequiredDocsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UploadRequiredDocsComponent]
    });
    fixture = TestBed.createComponent(UploadRequiredDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
