import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckLegalAdviceComponent } from './check-legal-advice.component';

describe('CheckLegalAdviceComponent', () => {
  let component: CheckLegalAdviceComponent;
  let fixture: ComponentFixture<CheckLegalAdviceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckLegalAdviceComponent]
    });
    fixture = TestBed.createComponent(CheckLegalAdviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
