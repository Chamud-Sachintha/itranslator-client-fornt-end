import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsAuthenticationComponent } from './sms-authentication.component';

describe('SmsAuthenticationComponent', () => {
  let component: SmsAuthenticationComponent;
  let fixture: ComponentFixture<SmsAuthenticationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SmsAuthenticationComponent]
    });
    fixture = TestBed.createComponent(SmsAuthenticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
