import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotaryServiceStep01Component } from './notary-service-step-01.component';

describe('NotaryServiceStep01Component', () => {
  let component: NotaryServiceStep01Component;
  let fixture: ComponentFixture<NotaryServiceStep01Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotaryServiceStep01Component]
    });
    fixture = TestBed.createComponent(NotaryServiceStep01Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
