import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteLegalAdviceComponent } from './complete-legal-advice.component';

describe('CompleteLegalAdviceComponent', () => {
  let component: CompleteLegalAdviceComponent;
  let fixture: ComponentFixture<CompleteLegalAdviceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompleteLegalAdviceComponent]
    });
    fixture = TestBed.createComponent(CompleteLegalAdviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
