


import {
    Component,
    OnInit
} from '@angular/core';



/*


import { 
    startOfDay,
    endOfDay,
    subDays,
    addDays,
    endOfMonth,
    isSameDay,
    isSameMonth,
    addHours
} from 'date-fns';
import { Subject } from 'rxjs/Subject';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import {
    CalendarEvent,
    CalendarEventAction,
    CalendarEventTimesChangedEvent,
    CalendarEventTitleFormatter
} from 'angular-calendar';

import {  AngularFireList } from 'angularfire2/database';

import { CalEventsService } from './cal-events.service'
import { CustomEventTitleFormatter } from './custom-event-title-formatter.service';

const colors: any = {
    red: {
        primary: '#ad2121',
        secondary: '#FAE3E3'
    },
    blue: {
        primary: '#1e90ff',
        secondary: '#D1E8FF'
    },
    yellow: {
        primary: '#e3bc08',
        secondary: '#FDF1BA'
    }
};

 */

import { Services } from './cal-utils/services.model';

export class eventsAPI {

    $key: string;
    firstName: string;
    lastName: string;
    phone: string;
    landline: string;
    //service: string;
    service: any[];
    start: Date;
    end: Date;
    stylist_title: string;
    gender: string;
    notes: string;
    email: string;        
}

@Component({
  
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] /*,
    providers: [CalEventsService,
        {
            provide: CalendarEventTitleFormatter,
            useClass: CustomEventTitleFormatter
        }
               ] */
})
export class AppComponent implements OnInit {

    ngOnInit(): void { }
    /* 
    @ViewChild('modalContent') modalContent: TemplateRef<any>;
    modalRef: NgbModalRef;
    createModalRef: NgbModalRef;

    view: string = 'month';

    viewDate: Date = new Date();

    errorMessage: string;
    modalData: {
        action: string;
        event: CalendarEvent;
    };

    actions: CalendarEventAction[] = [
        {
            label: '<i class="fa fa-fw fa-pencil"></i>',
            onClick: ({ event }: { event: CalendarEvent }): void => {
                this.handleEvent('Edited', event);
            }
        },
        {
            label: '<i class="fa fa-fw fa-times"></i>',
            onClick: ({ event }: { event: CalendarEvent }): void => {
                this.events = this.events.filter(iEvent => iEvent !== event);
                this.handleEvent('Deleted', event);
            }
        }
    ];

    appointmentList: AngularFireList<eventsAPI>;
    refresh: Subject<any> = new Subject();

  
    
    events: Array<CalendarEvent<{ $key: string; firstname: string, lastname: string, service: string, gender: string, stylist_title: string }>> = []

    filteredEvents: eventsAPI[];



   
    activeDayIsOpen: boolean = true;

    constructor(private modal: NgbModal, private _caleventService: CalEventsService) { }

    dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
        if (isSameMonth(date, this.viewDate)) {
            if (
                (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
                events.length === 0
            ) {
                this.activeDayIsOpen = false;
            } else {
                this.activeDayIsOpen = true;
                this.viewDate = date;
            }
        }
    }

    eventTimesChanged({
        event,
        newStart,
        newEnd
    }: CalendarEventTimesChangedEvent): void {
        event.start = newStart;
        event.end = newEnd;
        this.handleEvent('Dropped or resized', event);
        this.refresh.next();
    }

    handleEvent(action: string, event: CalendarEvent): void {
        this.modalData = { event, action };
       
        this.modalRef = this.modal.open(this.modalContent, { size: 'lg' });
        console.log(event);
        console.log(this.modalRef);
       
        this._caleventService.appointmentToUpdate = {
            $key: event.meta.$key,
            firstname: event.meta.firstname,
            lastname: event.meta.lastname,
            service: event.meta.service,
            start: event.start,
            end: event.end,
            stylist_title: event.meta.stylist_title,
            gender: event.meta.gender
        }


    }



    addEvent(date: Date): void {
        this.events.push({
            title: 'New event',
            start: date,
            end: date,
            color: colors.red,
            draggable: true,
            resizable: {
                beforeStart: true,
                afterEnd: true
            },
            meta: {
                $key: '',
                firstname: 'Firstname',
                lastname: 'lastname',
                service: 'service',
                gender: 'M',
                stylist_title: '',

            }
        });
        this.refresh.next();
    }



  
    loadevents(): void {
        this.events = [];   
        for (var i: number = 0; i < this.filteredEvents.length; i++) {
            this.events.push({
                title: this.filteredEvents[i].stylist_title,
                start: new Date(this.filteredEvents[i].start),
                end: new Date(this.filteredEvents[i].end),
                color: colors.yellow,
                draggable: true,
                resizable: {
                    beforeStart: true,
                    afterEnd: true
                },
                meta: {

                    $key: this.filteredEvents[i].$key,
                    firstname: this.filteredEvents[i].firstname,
                    lastname: this.filteredEvents[i].lastname,
                    service: this.filteredEvents[i].service,
                    gender: this.filteredEvents[i].gender,
                    stylist_title: this.filteredEvents[i].stylist_title
                   
                }
            });
            this.refresh.next();
            
        };
    }

    ngOnInit(): void {

        var x = this._caleventService.getFirebaseData();
        x.snapshotChanges().subscribe(item => {
            this.filteredEvents = [];
            item.forEach(element => {
                var y = element.payload.toJSON();
                y["$key"] = element.key;
                this.filteredEvents.push(y as eventsAPI);
                
            });
            console.log(this.filteredEvents);
            this.loadevents();
        });

     
        
    }

    open(modalAppointmentForm) {
        this.createModalRef = this.modal.open(modalAppointmentForm, { size: 'lg' });
       
    }
    onCloseModal(message: string) {
        console.log(message);
       

    }
    */
}

