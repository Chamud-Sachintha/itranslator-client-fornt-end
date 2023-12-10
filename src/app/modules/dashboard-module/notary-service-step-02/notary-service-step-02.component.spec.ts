import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotaryServiceStep02Component } from './notary-service-step-02.component';

describe('NotaryServiceStep02Component', () => {
  let component: NotaryServiceStep02Component;
  let fixture: ComponentFixture<NotaryServiceStep02Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotaryServiceStep02Component]
    });
    fixture = TestBed.createComponent(NotaryServiceStep02Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
