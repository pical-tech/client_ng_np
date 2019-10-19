import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { EventResponseData } from './../../_model';

@Injectable({
  providedIn: 'root'
})
export class GlobaleventifierService {
  protected readonly currentEvent: EventResponseData;
  private activeEvent = new BehaviorSubject<EventResponseData>(this.currentEvent);
  $activeEvent = this.activeEvent.asObservable();
  constructor() { }

  activeEventValueSubject(activeEvent: EventResponseData) {
    this.activeEvent.next(activeEvent);
  }

  getActiveEvents(): EventResponseData {
    return JSON.parse(sessionStorage.getItem('activeEvent'));
  }
}
