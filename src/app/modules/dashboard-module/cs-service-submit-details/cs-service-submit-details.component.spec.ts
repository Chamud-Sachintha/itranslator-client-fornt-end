import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsServiceSubmitDetailsComponent } from './cs-service-submit-details.component';

describe('CsServiceSubmitDetailsComponent', () => {
  let component: CsServiceSubmitDetailsComponent;
  let fixture: ComponentFixture<CsServiceSubmitDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CsServiceSubmitDetailsComponent]
    });
    fixture = TestBed.createComponent(CsServiceSubmitDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
