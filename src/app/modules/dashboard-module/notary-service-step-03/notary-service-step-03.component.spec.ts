import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotaryServiceStep03Component } from './notary-service-step-03.component';

describe('NotaryServiceStep03Component', () => {
  let component: NotaryServiceStep03Component;
  let fixture: ComponentFixture<NotaryServiceStep03Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotaryServiceStep03Component]
    });
    fixture = TestBed.createComponent(NotaryServiceStep03Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
