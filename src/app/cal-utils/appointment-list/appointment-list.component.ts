import { Component, OnInit } from '@angular/core';
import { CalEventsService } from './../../cal-events.service'
import { eventsAPI } from './../../app.component';
import { DatePipe } from '@angular/common';

import { Services } from './../services.model';




import {
    CalendarEventTitleFormatter
} from 'angular-calendar';
import { CustomEventTitleFormatter } from './../../custom-event-title-formatter.service';


//chaged services from Array to String to store join of services 
export class eventsAPIUpdate {

    $key: string;
    firstName: string;
    lastName: string;
    phone: string;
    landline: string;
    service: string;
    //service: any[];
    start: Date;
    end: Date;
    stylist_title: string;
    gender: string;
    notes: string;
}


@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
    styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {
    appointmentlist: eventsAPI[];
    filteredProducts: eventsAPIUpdate[] = [];
    filteredProductsUpdate: eventsAPIUpdate[] = [];

    dat1: Date = new Date();
    dat2: Date = new Date();

    //variable for services
    eventService1: string[] = [];



    _listFilterName: string;
    get listFilterName(): string {
        return this._listFilterName;
    }
    set listFilterName(value: string) {
        this._listFilterName = value;
        this.filteredProducts = this.listFilterName ? this.performFilter(this.listFilterName, "name") : this.filteredProductsUpdate;
    }

    _listFilterLastName: string;
    get listFilterLastName(): string {
        return this._listFilterLastName;
    }
    set listFilterLastName(value: string) {
        this._listFilterLastName = value;
        this.filteredProducts = this.listFilterLastName ? this.performFilter(this.listFilterLastName, "lastName") : this.filteredProductsUpdate;
    }


    _listFilterStylist: string;
    get listFilterStylist(): string {
        return this._listFilterStylist;
    }
    set listFilterStylist(value: string) {
        this._listFilterStylist = value;
        this.filteredProducts = this._listFilterStylist ? this.performFilter(this.listFilterStylist, "stylist") : this.filteredProductsUpdate;
    }


    _listFilterPhone: string;
    get listFilterPhone(): string {
        return this._listFilterPhone;
    }
    set listFilterPhone(value: string) {
        this._listFilterPhone = value;
        this.filteredProducts = this._listFilterPhone ? this.performFilter(this.listFilterPhone, "phone") : this.filteredProductsUpdate;
    }

    _listFilterServices: string;
    get listFilterServices(): string {
        return this._listFilterServices;
    }
    set listFilterServices(value: string) {
        this._listFilterServices = value;
        this.filteredProducts = this._listFilterServices ? this.performFilter(this.listFilterServices, "services") : this.filteredProductsUpdate;
    }

    _listFilterGender: string;
    get listFilterGender(): string {
        return this._listFilterGender;
    }
    set listFilterGender(value: string) {
        this._listFilterGender = value;
        this.filteredProducts = this._listFilterGender ? this.performFilter(this.listFilterGender, "gender") : this.filteredProductsUpdate;
    }

    _listFilterNotes: string;
    get listFilterNotes(): string {
        return this._listFilterNotes;
    }
    set listFilterNotes(value: string) {
        this._listFilterNotes = value;
        this.filteredProducts = this._listFilterNotes ? this.performFilter(this.listFilterNotes, "notes") : this.filteredProductsUpdate;
    }

    constructor(private _caleventService: CalEventsService) { }


    performFilter(filterBy: string, coloumnFilter: string): eventsAPIUpdate[] {
        filterBy = filterBy.toLocaleLowerCase();

        if (coloumnFilter == "name") {
            return this.filteredProducts.filter((appointment: eventsAPIUpdate) =>
            appointment.firstName.toLocaleLowerCase().indexOf(filterBy) !== -1);
        }
        if (coloumnFilter == "lastName") {
            return this.filteredProducts.filter((appointment: eventsAPIUpdate) =>
            appointment.lastName.toLocaleLowerCase().indexOf(filterBy) !== -1);
        }
        
        else if (coloumnFilter == "stylist") {
            return this.filteredProducts.filter((appointment: eventsAPIUpdate) =>
                appointment.stylist_title.toLocaleLowerCase().indexOf(filterBy) !== -1);
        }
        else if (coloumnFilter == "phone") {
            
            return this.filteredProducts.filter((appointment: eventsAPIUpdate) =>
                appointment.phone.toLocaleLowerCase().indexOf(filterBy) !== -1);
        }
        else if (coloumnFilter == "services") {
           
            return this.filteredProducts.filter((appointment: eventsAPIUpdate) =>
                appointment.service.toLocaleLowerCase().indexOf(filterBy) !== -1);
        
        }
        else if (coloumnFilter == "gender") {
       
            return this.filteredProducts.filter((appointment: eventsAPIUpdate) =>
                appointment.gender.toLocaleLowerCase().indexOf(filterBy) !== -1);
        }
        else if (coloumnFilter == "notes") {
           
            return this.filteredProducts.filter((appointment: eventsAPIUpdate) =>
                appointment.notes.toLocaleLowerCase().indexOf(filterBy) !== -1);
        }
    }


    ngOnInit() {


        var x = this._caleventService.getFirebaseData();
        x.snapshotChanges().subscribe(item => {
            this.appointmentlist = [];
            var eventService: Array<Services[]> = [];

                item.forEach(element => {
                    var y = element.payload.toJSON();
                    y["$key"] = element.key;
                    this.appointmentlist.push(y as eventsAPI); 

                    //add services in array
                    eventService.push(y["service"]);           
                });

               // this.filteredProducts = this.appointmentlist;
                //this.sortByDate();


            eventService.forEach(service => {
                var test1: string[] = [];

                //max number now 4 is same as count of myServiceOptions in input component
                for (var i: number = 0; i < 4; i++) {

                    if (service[i] === undefined) {

                    }
                    else {
                        //console.log(service[i].name);
                        test1.push(service[i].name);
                    }
                }
                this.eventService1.push(test1.join());
            });

            for (var _i = 0; _i < this.appointmentlist.length; _i++) {

                this.filteredProductsUpdate.push({
                    $key: this.appointmentlist[_i].$key,
                    firstName: this.appointmentlist[_i].firstName,
                    lastName: this.appointmentlist[_i].lastName,
                    phone: this.appointmentlist[_i].phone,
                    landline: this.appointmentlist[_i].landline,
                    service: this.eventService1[_i],
                    start: this.appointmentlist[_i].start,
                    end: this.appointmentlist[_i].end,
                    stylist_title: this.appointmentlist[_i].stylist_title,
                    gender: this.appointmentlist[_i].gender,
                    notes: this.appointmentlist[_i].notes
                     

                });
            }
            console.log(this.filteredProductsUpdate);
            this.filteredProducts = this.filteredProductsUpdate;
            this.sortByDate();


             

           
        });

       
        
    }

    public sortByDate(): void {
        this.filteredProducts.sort((a: eventsAPIUpdate, b: eventsAPIUpdate) => {

            this.dat1 = new Date(a.start);
            this.dat2 = new Date(b.start);
            return this.dat2.getTime() - this.dat1.getTime();

          
        });
        this.filteredProductsUpdate.sort((a: eventsAPIUpdate, b: eventsAPIUpdate) => {

            this.dat1 = new Date(a.start);
            this.dat2 = new Date(b.start);
            return this.dat2.getTime() - this.dat1.getTime();


        });
       
    }

    

    onItemClick(app: eventsAPI) {
        this._caleventService.selectedAppointment = Object.assign({}, app);
    }

}
