import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteTrOrdersComponent } from './complete-tr-orders.component';

describe('CompleteTrOrdersComponent', () => {
  let component: CompleteTrOrdersComponent;
  let fixture: ComponentFixture<CompleteTrOrdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompleteTrOrdersComponent]
    });
    fixture = TestBed.createComponent(CompleteTrOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
