import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalContextmenuComponent } from './cal-contextmenu.component';

describe('CalContextmenuComponent', () => {
  let component: CalContextmenuComponent;
  let fixture: ComponentFixture<CalContextmenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalContextmenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalContextmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
