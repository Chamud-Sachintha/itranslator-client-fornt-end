import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotaryServiceComponent } from './notary-service.component';

describe('NotaryServiceComponent', () => {
  let component: NotaryServiceComponent;
  let fixture: ComponentFixture<NotaryServiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotaryServiceComponent]
    });
    fixture = TestBed.createComponent(NotaryServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
