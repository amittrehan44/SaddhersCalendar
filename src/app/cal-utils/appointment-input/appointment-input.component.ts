import { Component, OnInit, ViewChild, TemplateRef, Input, Output, EventEmitter } from '@angular/core';
import { CalEventsService } from './../../cal-events.service'
import { NgForm } from '@angular/forms'
import { Subject } from 'rxjs/Subject';
import { NgbModal, NgbModalRef, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

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


import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';

import { Services } from './../services.model';
import {ToastrService} from 'ngx-toastr';


@Component({
  selector: 'app-appointment-input',
  templateUrl: './appointment-input.component.html',
  styleUrls: ['./appointment-input.component.css']
})
export class AppointmentInputComponent implements OnInit {
   //@ViewChild('modalContent') modalContent: TemplateRef<any>;
    @Input() modalRef: NgbModalRef;
    @Input() createModalRef: NgbModalRef;
    @Output() closeModal: EventEmitter<string> = new EventEmitter<string>();
    
    refresh: Subject<any> = new Subject();

    //mask: any[] = ['+', '1', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    mask: any[] = ['+', '1', /[1-9]/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
    mask1: any[] = [/[0-9]/, ':', /[0-5]/, /[0-9]/];
    mask2: any[] = [/^[0-9]+(\.[0-9]{1,2})?$/];

    //Variables for multiselect services
    optionsModel: number[] = [];
    myServiceOptions: IMultiSelectOption[];
    selectedService: Services[];

    constructor(public _caleventService: CalEventsService, public modal: NgbModal, private tostr: ToastrService) { }

    ngOnInit() {
        
        this.resetForm();
       

        setTimeout(() => {
            this.setStartData();
        });


        //for service multiselect
        this.myServiceOptions = [
            { id: 1, name: 'Haircut' },
            { id: 2, name: 'Trimming' },
            { id: 3, name: 'Threading' },
            { id: 4, name: 'Waxing' },
            { id: 5, name: 'Facial' },
            { id: 6, name: 'Pedicure' },
            { id: 7, name: 'Manicure' },
            { id: 8, name: 'Nails' },
            { id: 9, name: 'Makeup' },
            { id: 10, name: 'Colour' },
            { id: 11, name: 'Perms' },
            { id: 12, name: 'Laser Services' },
            { id: 13, name: 'Other' },
        ]; 

        this.setServices();
/*
        this.myServiceOptions= [
            { id: 1, name: 'Car brands', isLabel: true },
            { id: 2, name: 'Volvo', parentId: 1 },
            { id: 3, name: 'Honda', parentId: 1 },
            { id: 4, name: 'BMW', parentId: 1 },
            { id: 5, name: 'Colors', isLabel: true },
            { id: 6, name: 'Blue', parentId: 5 },
            { id: 7, name: 'Red', parentId: 5 },
            { id: 8, name: 'White', parentId: 5 }
        ];   
*/          
    }

    //for service multiselect
    onChange(a: any) {
        

        this.selectedService = [];
        if (this.optionsModel != null) { 
        for (var i: number = 0; i < this.optionsModel.length; i++) {
            this.selectedService.push({
                id: this.optionsModel[i],
                name: this.myServiceOptions[this.optionsModel[i] - 1].name

            });
        }
    }
        console.log(this.selectedService);
        this._caleventService.selectService = this.selectedService;
    }


    resetForm(form?: NgForm) {
        if (form != null)
            form.reset();
        this._caleventService.selectedAppointment = {
            $key: null,
            firstName: '',
            lastName: '',
            phone: '',
            landline: '',
            //service: '',
            service: [],
            start: new Date(),
            end: new Date(),
            stylist_title: '',
            gender: '',
            notes: '',
            email: ''
        }
        this._caleventService.durationString = '0:15';
        
    }

    onSubmit(form: NgForm) {
        if (form.value.$key == null) {
            this._caleventService.insertAppointment(form.value);
            console.log("On Create: ");
            console.log(form.value);
            this.closeModal.emit('create');
            
        }
        else {
            this._caleventService.updateAppointment(form.value);
            console.log("On Update: ");
            console.log(form.value);
            this.closeModal.emit('update');
            
            }
        this.resetForm(form);
       
        if (this.createModalRef != null)
            this.createModalRef.close();

        if (this.modalRef != null)
            this.modalRef.close();

            this.tostr.success('Submitted Succcessfully', 'Appointment');
        
    }

    onDelete(form: NgForm) {
        if (confirm('Are you sure to delete this record ?') == true) {
            this._caleventService.deleteAppointment(form.value.$key);
            this.resetForm(form);

            if (this.modalRef != null)
                this.modalRef.close();
        }

        this.tostr.warning("Deleted Successfully", "Appointment");
    }

    setStartData() {
        if (this._caleventService.contextDate != null)
            {
            this._caleventService.selectedAppointment.start = this._caleventService.contextDate;
            this._caleventService.selectedAppointment.end = this._caleventService.contextDate;
            this._caleventService.contextDate = null;
        }
        if (this._caleventService.appointmentToUpdate != null) {
            this._caleventService.selectedAppointment = this._caleventService.appointmentToUpdate;
            this._caleventService.durationString = this._caleventService._durationString1;
            this.optionsModel = this._caleventService.optionsMultiselect;
            this._caleventService._durationString1 = null;
            this._caleventService.appointmentToUpdate = null;
            this._caleventService.optionsMultiselect = null;
        }    
    }

    setServices() {
        this.optionsModel = this._caleventService.optionsMultiselect;
        if (this.optionsModel != null) {
            this.selectedService = [];
            for (var i: number = 0; i < this.optionsModel.length; i++) {
                this.selectedService.push({
                    id: this.optionsModel[i],
                    name: this.myServiceOptions[this.optionsModel[i] - 1].name

                });

                this._caleventService.selectService = this.selectedService;
            }
        }
    }
}
