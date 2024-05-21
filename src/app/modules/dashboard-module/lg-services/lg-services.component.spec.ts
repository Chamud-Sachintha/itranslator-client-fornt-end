import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LgServicesComponent } from './lg-services.component';

describe('LgServicesComponent', () => {
  let component: LgServicesComponent;
  let fixture: ComponentFixture<LgServicesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LgServicesComponent]
    });
    fixture = TestBed.createComponent(LgServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
