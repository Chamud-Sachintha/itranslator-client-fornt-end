import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteNsOrdersComponent } from './complete-ns-orders.component';

describe('CompleteNsOrdersComponent', () => {
  let component: CompleteNsOrdersComponent;
  let fixture: ComponentFixture<CompleteNsOrdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompleteNsOrdersComponent]
    });
    fixture = TestBed.createComponent(CompleteNsOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
