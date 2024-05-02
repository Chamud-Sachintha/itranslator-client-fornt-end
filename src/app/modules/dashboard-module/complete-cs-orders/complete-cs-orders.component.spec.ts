import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteCsOrdersComponent } from './complete-cs-orders.component';

describe('CompleteCsOrdersComponent', () => {
  let component: CompleteCsOrdersComponent;
  let fixture: ComponentFixture<CompleteCsOrdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompleteCsOrdersComponent]
    });
    fixture = TestBed.createComponent(CompleteCsOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
