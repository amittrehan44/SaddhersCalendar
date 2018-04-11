import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { environment } from './../../environments/environment';
//import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule,  CalendarNativeDateFormatter, CalendarDateFormatter, DateFormatterParams   } from 'angular-calendar';
import { FormsModule } from '@angular/forms';


import { MyCalendarComponent } from './my-calendar.component';
import { CalUtilsModule } from './../cal-utils/cal-utils.module';
import { AppComponent } from './../app.component';

import { AppRoutingModule } from './../app-routing.module';


import { CalEventsService } from './../cal-events.service'
import { CalendarEventTitleFormatter} from 'angular-calendar';
import { CustomEventTitleFormatter } from './../custom-event-title-formatter.service';


export class CustomDateFormatter extends CalendarNativeDateFormatter {

    public dayViewHour({date, locale}: DateFormatterParams): string {
      return new Intl.DateTimeFormat('en-us', {
        hour: 'numeric',
        minute: 'numeric'
      }).format(date);
    }
  
  }


@NgModule({
  imports: [
      CommonModule,
//      BrowserModule,
      BrowserAnimationsModule,
      NgbModule.forRoot(),
      NgbModalModule.forRoot(),
      FormsModule,
      CalendarModule.forRoot({
        dateFormatter: {
          provide: CalendarDateFormatter, 
          useClass: CustomDateFormatter
        }
      }),
      CalUtilsModule,
      CalendarModule,
      AppRoutingModule
  ],
    declarations: [MyCalendarComponent],
    exports: [MyCalendarComponent

    ],
    providers: [CalEventsService,
        {
            provide: CalendarEventTitleFormatter,
            useClass: CustomEventTitleFormatter
        }
    ]
})
export class MyCalendarModule { }
