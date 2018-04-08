import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
    NgbDatepickerModule,
    NgbTimepickerModule
} from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule } from 'angular-calendar';
import { DateTimePickerComponent } from './date-time-picker.component';
import { CalendarHeaderComponent } from './calendar-header.component';
import { CalContextmenuComponent } from './cal-contextmenu/cal-contextmenu.component';
import { AppModule } from './../app.module';
import { ContextMenuModule } from  'ngx-contextmenu/lib';
import { AppointmentInputComponent } from './appointment-input/appointment-input.component';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { AppointmentTodayComponent } from './appointment-today/appointment-today.component';
import { AppRoutingModule } from './../app-routing.module';
import { TextMaskModule } from 'angular2-text-mask';
import { NavbarComponent } from './navbar/navbar.component';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { Services } from './services.model';
import { ChartsComponent } from './charts/charts.component';
import { ChartsModule as Ng2Charts } from 'ng2-charts';


@NgModule({
  imports: [
      CommonModule,
      FormsModule,
      NgbDatepickerModule.forRoot(),
      NgbTimepickerModule.forRoot(),
      CalendarModule,
      AppRoutingModule,
      ContextMenuModule.forRoot({
          autoFocus: true,
           useBootstrap4: true,
      }),
      
      TextMaskModule,
      MultiselectDropdownModule,
      Ng2Charts
  ],
  declarations: [DateTimePickerComponent, CalendarHeaderComponent, CalContextmenuComponent, AppointmentInputComponent, AppointmentListComponent, AppointmentTodayComponent, NavbarComponent, ChartsComponent],
    exports: [CalendarHeaderComponent, DateTimePickerComponent, CalContextmenuComponent, ContextMenuModule, AppointmentInputComponent, AppointmentListComponent, AppointmentTodayComponent, NavbarComponent ]
})
export class CalUtilsModule { }
