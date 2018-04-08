import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentInputComponent } from './appointment-input.component';

describe('AppointmentInputComponent', () => {
  let component: AppointmentInputComponent;
  let fixture: ComponentFixture<AppointmentInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointmentInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
