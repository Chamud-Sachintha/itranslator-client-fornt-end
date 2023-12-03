import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadRequiredDocsComponent } from './upload-required-docs.component';

describe('UploadRequiredDocsComponent', () => {
  let component: UploadRequiredDocsComponent;
  let fixture: ComponentFixture<UploadRequiredDocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadRequiredDocsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadRequiredDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
