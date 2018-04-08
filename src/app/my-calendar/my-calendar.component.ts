import {
    Component, OnInit, ChangeDetectionStrategy,
    ViewChild,
    TemplateRef } from '@angular/core';

import {
    startOfDay,
    endOfDay,
    subDays,
    addDays,
    endOfMonth,
    isSameDay,
    isSameMonth,
    addHours,
    differenceInMinutes
} from 'date-fns';

import { Subject } from 'rxjs/Subject';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import {
    CalendarEvent,
    CalendarEventAction,
    CalendarEventTimesChangedEvent,
    CalendarEventTitleFormatter,
    CalendarMonthViewDay 
} from 'angular-calendar';

import { AngularFireList } from 'angularfire2/database';

import { CalEventsService } from './../cal-events.service'
import { CustomEventTitleFormatter } from './../custom-event-title-formatter.service';
import { AuthService } from './../core/auth.service';
import { eventsAPI } from './../app.component';
import { Services } from './../cal-utils/services.model';

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




@Component({
  selector: 'app-my-calendar',
  templateUrl: './my-calendar.component.html',
    styleUrls: ['./my-calendar.component.css']
})
export class MyCalendarComponent implements OnInit {

    @ViewChild('modalContent') modalContent: TemplateRef<any>;
    modalRef: NgbModalRef;
    createModalRef: NgbModalRef;

    // view: string = 'month';
    view: string = 'day';

    viewDate: Date = new Date();

    eventColor: any;
    eventType: string;

    /* used to sort the dates in filteredevents array */
    dat1: Date = new Date();
    dat2: Date = new Date();

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

    /*   events: CalendarEvent[] = []; */
    events: Array<CalendarEvent<{ $key: string; firstName: string, lastName: string, phone: string, landline: string, service: string, gender: string, stylist_title: string, notes: string, email: string, serviceOptionIds: number[], type: string }>> = []

    filteredEvents: eventsAPI[];

    eventService: Services[];
    evenServicesName: string[];
 //   eventServiceJoin: string;
    eventServiceJoin1: string[]=[];
    serviceIds: number[] = [];
    eventServiceIDs: Array<number[]> = [];

    /* Moving below arrya in cal-event service  */

    /*   events: CalendarEvent[] = [
           {
               start: subDays(startOfDay(new Date()), 1),
               end: addDays(new Date(), 1),
               title: 'A 3 day event',
               color: colors.red,
               actions: this.actions
           },
           {
               start: startOfDay(new Date()),
               title: 'An event with no end date',
               color: colors.yellow,
               actions: this.actions
           },
           {
               start: subDays(endOfMonth(new Date()), 3),
               end: addDays(endOfMonth(new Date()), 3),
               title: 'A long event that spans 2 months',
               color: colors.blue
           },
           {
               start: addHours(startOfDay(new Date()), 2),
               end: new Date(),
               title: 'A draggable and resizable event',
               color: colors.yellow,
               actions: this.actions,
               resizable: {
                   beforeStart: true,
                   afterEnd: true
               },
               draggable: true
           }
       ];
   */
    activeDayIsOpen: boolean = true;

    durationMins: number;
    durationHrs: string;
    _tempMins: number;
    _tempMinsStr: string;

    constructor(public modal: NgbModal, public _caleventService: CalEventsService, public auth: AuthService) { }

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
        //this.modalRef = this.modal.open(this.modalContent, { size: 'sm' });
        this.modalRef = this.modal.open(this.modalContent, { size: 'lg' });
        console.log(event);
        console.log(this.modalRef);
        // Assign values of selected appointment to selected events
        /* this._caleventService.appointmentToUpdate.$key = event.meta.$key;
        this._caleventService.appointmentToUpdate.firstname = event.meta.firstname;
        this._caleventService.appointmentToUpdate.lastname = event.meta.lastname;
        this._caleventService.appointmentToUpdate.gender = event.meta.gender;
        this._caleventService.appointmentToUpdate.stylist_title = event.meta.stylist_title;
        this._caleventService.appointmentToUpdate.start = event.start;
        this._caleventService.appointmentToUpdate.end = event.end;
        */
        this._caleventService.appointmentToUpdate = {
            $key: event.meta.$key,
            firstName: event.meta.firstName,
            lastName: event.meta.lastName,
            phone: event.meta.phone,
            landline: event.meta.landline,
            service: event.meta.service,
            start: event.start,
            end: event.end,
            stylist_title: event.meta.stylist_title,
            gender: event.meta.gender,
            notes: event.meta.notes,
            email: event.meta.email
        }

        //Place code to fill duration
        this.durationMins = differenceInMinutes(event.end, event.start);
        this.durationHrs = Number(this.durationMins / 60).toFixed(2);
        console.log(this.durationHrs);
        console.log(Number(Number(this.durationHrs.substring(2, 4)) / 100) * 60);
        this._tempMins = Math.round(Number(Number(this.durationHrs.substring(2, 4)) / 100) * 60);

        if (this._tempMins > 9) {
            this._tempMinsStr = this._tempMins.toString();
        }
        else {
            this._tempMinsStr = "0" + this._tempMins;
        }

        console.log(this._tempMinsStr);
        this._caleventService._durationString1 = this.durationHrs.substring(0, 1) + ":" + this._tempMinsStr;

        this._caleventService.optionsMultiselect = event.meta.serviceOptionIds;
    }


    /* I dont think this function is used anywhere
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
                name: 'Firstname',
                phone: 'phone',
                service: 'service',
                gender: 'M',
                stylist_title: '',
                notes: ''
            }
        });
        this.refresh.next();
    }

*/

    /*Below function is created to add event with right click
    contextAdd(message: string): void {
        this.events.push({
            title: 'New event',
            start: startOfDay(new Date()),
            end: endOfDay(new Date()),
            color: colors.red,
            draggable: true,
            resizable: {
                beforeStart: true,
                afterEnd: true
            },
            meta: {

                firstname: 'Firstname',
                lastname: 'lastname',
                service: 'service',
                gender: 'M'

            }
        });
        this.refresh.next();
        
    }
    */

    loadServices(): void {
        //initialize to empty array in ngOnInit menthod
        //this.eventServiceJoin1 = [];
        //this.eventServiceIDs = [];

        for (var i: number = 0; i < this.filteredEvents.length; i++) {
        
             //get all services in new array from firebase
            var z = this._caleventService.getFirebaseServiceData(this.filteredEvents[i].$key);
            var eventServiceJoin: string;
            z.snapshotChanges().subscribe(item => {
                this.eventService = [];
                this.evenServicesName = [];
                this._caleventService.optionsMultiselect = [];
                this.serviceIds = [];
                //this.eventServiceJoin1 = [];
                item.forEach(element => {
                    var y = element.payload.toJSON();
                    // y["$key"] = element.key;
                    this.eventService.push(y as Services);
                    this.evenServicesName.push(y["name"]);
                    //this._caleventService.optionsMultiselect.push(y["id"]);
                    this.serviceIds.push(y["id"]);
                    //console.log(y["name"]);
                });
//                console.log(this.evenServicesName.join());
                eventServiceJoin = this.evenServicesName.join();
                this.eventServiceJoin1.push(eventServiceJoin);
                
                this.eventServiceIDs.push(this.serviceIds);
              
                //this.eventServiceJoinIds.push(this.eventServiceJoin);
                
                //call load events here
                return this.loadevents();
            });
            
        }
        
    }

    loadevents(): void {
        const eventService: string[] = [];
        this.events = [];
        if (this.eventServiceJoin1.length == this.filteredEvents.length){     
            for (var i: number = 0; i < this.eventServiceJoin1.length; i++) {

                //Select Color as per stylist
                if (this.filteredEvents[i].stylist_title == "Gurpreet") {
                    this.eventColor = colors.blue;
                    this.eventType = "info";
                }
                else if (this.filteredEvents[i].stylist_title == "Meena") {
                    this.eventColor = colors.red;
                    this.eventType = "danger";
                }
                else {
                    this.eventColor = colors.yellow;
                    this.eventType = "warning";
                }


                //get all services in new array
                /*           
                           var z = this._caleventService.getFirebaseServiceData(this.filteredEvents[i].$key);
                           z.snapshotChanges().subscribe(item => {
                               this.eventService = [];
                               this.evenServicesName = [];
                               item.forEach(element => {
                                   var y = element.payload.toJSON();
                                   // y["$key"] = element.key;
                                   this.eventService.push(y as Services);
                                   this.evenServicesName.push(y["name"]);
                                   console.log(y["name"]);
                               });
                               console.log(this.evenServicesName.join());
                               this.eventServiceJoin = this.evenServicesName.join();
                           });
               
                

                console.log(i);
                console.log(this.filteredEvents[i].name);
                console.log(this.eventServiceJoin1[i]);
 */
                this.events.push({
                    title: this.filteredEvents[i].stylist_title,
                    start: new Date(this.filteredEvents[i].start),
                    end: new Date(this.filteredEvents[i].end),
                    color: this.eventColor,
                    draggable: false,
                    resizable: {
                        beforeStart: false,
                        afterEnd: false
                    },
                    meta: {

                        $key: this.filteredEvents[i].$key,
                        firstName: this.filteredEvents[i].firstName,
                        lastName: this.filteredEvents[i].lastName,
                        phone: this.filteredEvents[i].phone,
                        landline: this.filteredEvents[i].landline,
                        service: this.eventServiceJoin1[i],
                        gender: this.filteredEvents[i].gender,
                        stylist_title: this.filteredEvents[i].stylist_title,
                        notes: this.filteredEvents[i].notes,
                        serviceOptionIds: this.eventServiceIDs[i],
                        type: this.eventType,
                        email: this.filteredEvents[i].email

                    }
                });
                this.refresh.next();



            };
        } 
    }

    ngOnInit(): void {

        var x = this._caleventService.getFirebaseData();
        x.snapshotChanges().subscribe(item => {
            this.filteredEvents = [];
            this.eventServiceJoin1 = [];
            this.eventServiceIDs = [];
            item.forEach(element => {
                var y = element.payload.toJSON();
                y["$key"] = element.key;
                this.filteredEvents.push(y as eventsAPI);

            });
            console.log(this.filteredEvents);
            this.sortByDate();
            this.loadServices();
            //call load events in load services
//            this.loadevents();
            
        });


    }

    public sortByDate(): void {
        this.filteredEvents.sort((a: eventsAPI, b: eventsAPI) => {

            this.dat1 = new Date(a.start);
            this.dat2 = new Date(b.start);
            return this.dat1.getTime() - this.dat2.getTime();


        });
    }

    open(modalAppointmentForm) {
        this.createModalRef = this.modal.open(modalAppointmentForm, { size: 'lg' });

    }
    onCloseModal(message: string) {
        console.log(message);


    }

    beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
        body.forEach(cell => {
            const groups: any = {};
            cell.events.forEach((event: CalendarEvent<{ type: string }>) => {
                groups[event.meta.type] = groups[event.meta.type] || [];
                groups[event.meta.type].push(event);
            });
            cell['eventGroups'] = Object.entries(groups);
        });
    }

}
