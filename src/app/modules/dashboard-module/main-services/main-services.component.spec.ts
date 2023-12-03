import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainServicesComponent } from './main-services.component';

describe('MainServicesComponent', () => {
  let component: MainServicesComponent;
  let fixture: ComponentFixture<MainServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainServicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
