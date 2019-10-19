import { Injectable } from '@angular/core';
import { BaseProviderService } from './../BaseProvider.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventService extends BaseProviderService {

  constructor(public http: HttpClient) {
    super(http);
  }

  creatUserEvent(eventObject) {
    return this.makePostCall(environment.API_URL + '/events', eventObject);
  }
  getUserEvent() {
    return this.makeGetCall(environment.API_URL + '/events');
  }
}
