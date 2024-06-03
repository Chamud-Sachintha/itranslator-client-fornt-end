import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckCdOrderComponent } from './check-cd-order.component';

describe('CheckCdOrderComponent', () => {
  let component: CheckCdOrderComponent;
  let fixture: ComponentFixture<CheckCdOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckCdOrderComponent]
    });
    fixture = TestBed.createComponent(CheckCdOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
