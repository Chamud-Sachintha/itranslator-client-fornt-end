import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckTrOrderComponent } from './check-tr-order.component';

describe('CheckTrOrderComponent', () => {
  let component: CheckTrOrderComponent;
  let fixture: ComponentFixture<CheckTrOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckTrOrderComponent]
    });
    fixture = TestBed.createComponent(CheckTrOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
