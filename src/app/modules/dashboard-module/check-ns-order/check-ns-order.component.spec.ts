import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckNsOrderComponent } from './check-ns-order.component';

describe('CheckNsOrderComponent', () => {
  let component: CheckNsOrderComponent;
  let fixture: ComponentFixture<CheckNsOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckNsOrderComponent]
    });
    fixture = TestBed.createComponent(CheckNsOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
