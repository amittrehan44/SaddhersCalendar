import { Component, OnInit } from '@angular/core';
import { CalEventsService } from './../../cal-events.service'
import { eventsAPI } from './../../app.component';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-appointment-today',
  templateUrl: './appointment-today.component.html',
  styleUrls: ['./appointment-today.component.css']
})
export class AppointmentTodayComponent implements OnInit {

    appointmentlist: eventsAPI[];
    todaysAppointment: eventsAPI[];

    monthNames: any = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];

    today: Date = new Date();
    dat1: Date = new Date();
    dat2: Date = new Date();
    dummy: String;


    


    constructor(private _caleventService: CalEventsService) { }

    ngOnInit() {


        var x = this._caleventService.getFirebaseData();
        x.snapshotChanges().subscribe(item => {
            this.appointmentlist = [];
            this.todaysAppointment = [];
            item.forEach(element => {
                var y = element.payload.toJSON();
                y["$key"] = element.key;
                this.appointmentlist.push(y as eventsAPI);


                this.dummy = y["start"];
                /* for double digits date (10-31) */
                if (this.dummy.substring(8, 10) == this.today.getDate().toString() && this.dummy.substring(4, 7) == this.monthNames[this.today.getMonth()] && this.dummy.substring(11, 15) == this.today.getFullYear().toString()) {
                    this.todaysAppointment.push(y as eventsAPI);


                }
                /* for date with single digits (1-9) */
                else if (this.dummy.substring(9, 10) == this.today.getDate().toString() && this.dummy.substring(4, 7) == this.monthNames[this.today.getMonth()] && this.dummy.substring(11, 15) == this.today.getFullYear().toString()) {
                    this.todaysAppointment.push(y as eventsAPI);
                }
            });
            

            console.log(this.appointmentlist);
            console.log("belwo are upcoming appointments: ");
            console.log(this.todaysAppointment);
            
            this.sortByDate();
            console.log("belwo are sorted upcoming appointments: ");
            console.log(this.todaysAppointment);
            /*
                     //  console.log(this.appointmentlist.find(i => new Date(i.start.getDate()).toString() === this.today.getDate().toString()));
                       this.date1 = new Date(this.appointmentlist[0].start);
                       console.log(this.date1.getDate());
           
                       for (var i: number = 0; i < this.appointmentlist.length; i++) {
                           this.date1 = new Date(this.appointmentlist[i].start);
                           if (this.date1.getDate() == this.today.getDate()) { 
                               console.log("AAj Mangalwar hai");
                               this.todaysAppointment.push({
                                   $key: this.appointmentlist[i].$key,
                                   firstname: this.appointmentlist[i].firstname,
                                   lastname: this.appointmentlist[i].lastname,
                                   service: this.appointmentlist[i].service,
                                   start: this.appointmentlist[i].start,
                                   end: this.appointmentlist[i].end,
                                   stylist_title: this.appointmentlist[i].stylist_title,
                                   gender: this.appointmentlist[i].gender
                               });
                           }
                       };
                       console.log("belwo are upcoming appointments: ");  
                       console.log(this.todaysAppointment);   
           */
        });

        // this.todaysAppointment = this.appointmentlist.find(i => i.start.getDate() === this.today.getDate());




    }

    public sortByDate(): void {
        console.log(this.today.getDate());
        console.log(this.today.getMonth());
        console.log(this.today.getFullYear());
        this.todaysAppointment.sort((a: eventsAPI, b: eventsAPI) => {

            this.dat1 = new Date(a.start);
            this.dat2 = new Date(b.start);
            return this.dat1.getTime() - this.dat2.getTime();

        });

    }

    private getTime(date?: Date) {
        return date != null ? date.getDate() : 0;
    }

    onItemClick(app: eventsAPI) {
        this._caleventService.selectedAppointment = Object.assign({}, app);
    }

}
