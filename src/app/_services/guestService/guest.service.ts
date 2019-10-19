import { Injectable } from '@angular/core';
import { BaseProviderService } from './../BaseProvider.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GuestService extends BaseProviderService {

  constructor(public http: HttpClient) {
    super(http);
  }
  getRSVPList() {
    return this.makeGetCall(environment.API_URL + '/rsvpForm');
  }
  guestApprovalList() {
    return this.makeGetCall(environment.API_URL + '/userConsumer');
  }
  updateguestState(request) {
    return this.makePutCall(environment.API_URL + '/userConsumer', request)
  }
}
