import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotaryOrderRequestsComponent } from './notary-order-requests.component';

describe('NotaryOrderRequestsComponent', () => {
  let component: NotaryOrderRequestsComponent;
  let fixture: ComponentFixture<NotaryOrderRequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotaryOrderRequestsComponent]
    });
    fixture = TestBed.createComponent(NotaryOrderRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
