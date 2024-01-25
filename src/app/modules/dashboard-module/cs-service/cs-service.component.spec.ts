import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsServiceComponent } from './cs-service.component';

describe('CsServiceComponent', () => {
  let component: CsServiceComponent;
  let fixture: ComponentFixture<CsServiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CsServiceComponent]
    });
    fixture = TestBed.createComponent(CsServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
