import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectRequiredDocsComponent } from './select-required-docs.component';

describe('SelectRequiredDocsComponent', () => {
  let component: SelectRequiredDocsComponent;
  let fixture: ComponentFixture<SelectRequiredDocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectRequiredDocsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectRequiredDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
