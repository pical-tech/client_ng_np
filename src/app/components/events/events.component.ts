import { Component, OnInit, ViewChildren, NgZone, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  public eventForm: FormGroup;
  constructor() { }

  ngOnInit() {
    this.createEventForm();
  }
  addEventForm() {

  }

  private createEventForm() {
    this.eventForm = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      venue: new FormControl(null, [Validators.required]),
      date_time: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required])
    });
  }
}
