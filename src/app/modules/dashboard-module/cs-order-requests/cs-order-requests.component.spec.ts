import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsOrderRequestsComponent } from './cs-order-requests.component';

describe('CsOrderRequestsComponent', () => {
  let component: CsOrderRequestsComponent;
  let fixture: ComponentFixture<CsOrderRequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CsOrderRequestsComponent]
    });
    fixture = TestBed.createComponent(CsOrderRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
