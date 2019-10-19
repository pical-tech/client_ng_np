import { GlobaleventifierService } from './../../_services/globaleventifier/globaleventifier.service';
import { Component, OnInit, ViewChildren, NgZone, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { EventService, LoaderService } from './../../_services';
import { EventResponseModel, EventResponseData, EventResponse } from './../../_model';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  public eventForm: FormGroup;
  public event_time: Date;
  public minDate = new Date();
  public userEventDetails = new EventResponseModel();
  public eventList: Array<EventResponseData> = [];
  public isNewEvent = false;
  constructor(private globaleventifier: GlobaleventifierService, private eventService: EventService, public router: Router, private toastr: ToastrService, private loaderService: LoaderService) {

  }

  ngOnInit() {
    this.createEventForm();
    sessionStorage.removeItem('activeEvent');
    this.globaleventifier.activeEventValueSubject(null);
    this.loaderService.show();
    this.eventService.getUserEvent().subscribe((res: EventResponseModel) => {
      if (res && res.data && !res.is_error && res.data.rows && res.data.rows.length) {
        this.userEventDetails = res as EventResponseModel;
        this.eventList = this.userEventDetails.data.rows as EventResponseData[];
        this.isNewEvent = this.eventList.length > 0 ? false : true;
      } else {
        this.isNewEvent = true;
      }
      this.loaderService.hide();
    }, (error: any) => {
      sessionStorage.clear();
      this.toastr.error('please login again', 'Oppss..  Token Expired.', { timeOut: 3000, progressBar: true, closeButton: true });
      this.router.navigate(['/login']);
      this.loaderService.hide();
    });
  }
  goToEventDetails(eventDetail) {
    sessionStorage.setItem('activeEvent', JSON.stringify(eventDetail));
    this.toastr.info(eventDetail.title, 'You are logged in', { timeOut: 3000, progressBar: true, closeButton: true });
    this.router.navigate(['/ceremony']);
  }
  createEvent() {
    this.loaderService.show();
    this.eventService.creatUserEvent(this.eventForm.value).subscribe((res: any) => {
      if (res && !res.is_error && res.data && res.data.id) {
        this.toastr.success('congratulations your event successfully created', '', { timeOut: 3000, progressBar: true, closeButton: true });
        sessionStorage.setItem('activeEvent', JSON.stringify(res.data));
        this.router.navigate(['/ceremony']);
      } else {
        this.isNewEvent = false;
        this.toastr.error('somting went wrong!!', 'please try after sometime.', { timeOut: 3000, progressBar: true, closeButton: true });
      }
      this.loaderService.hide();
    }, (error: any) => {
      this.isNewEvent = false;
      sessionStorage.clear();
      // this.toastr.error('somting went wrong!!', 'please try after sometime.', { timeOut: 3000, progressBar: true, closeButton: true });
      this.toastr.error('please login again', 'Oppss..  Token Expired.', { timeOut: 3000, progressBar: true, closeButton: true });
      this.router.navigate(['/login']);
      this.loaderService.hide();
    });
  }

  eventDateChange() {
    this.eventForm.patchValue({ event_date: new DatePipe(navigator.language).transform(this.eventForm.get('event_date').value, 'y-MM-dd') });
  }

  eventTimeChange() {
    this.eventForm.patchValue({ event_time: new DatePipe(navigator.language).transform(this.event_time, 'h:mm a') });
  }
  createEventDetails() {
    this.isNewEvent = !this.isNewEvent;
  }
  private createEventForm() {
    this.eventForm = new FormGroup({
      bride_name: new FormControl(null, [Validators.required]),
      groom_name: new FormControl(null, [Validators.required]),
      event_date: new FormControl(null, [Validators.required]),
      event_time: new FormControl(null, [Validators.required]),
      title: new FormControl(null, [Validators.required]),
      address: new FormControl(null, [Validators.required]),
      venue: new FormControl(null, [Validators.required]),
      pin_code: new FormControl(null, [Validators.required, Validators.maxLength(6), Validators.minLength(6)])
    });
  }
}
