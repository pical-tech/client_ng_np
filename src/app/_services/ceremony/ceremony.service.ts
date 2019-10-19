import { Injectable } from '@angular/core';
import { BaseProviderService } from './../BaseProvider.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CeremonyService extends BaseProviderService {
  constructor(public http: HttpClient) {
    super(http);
  }

  getCeremony(id) {
    return this.makeGetCall(environment.API_URL + '/ceremony/event_id/' + id);
  }
  setCeremony(ceremonyObject) {
    return this.makePostCall(environment.API_URL + '/ceremony', ceremonyObject);
  }
  updateCeremony(ceremonyObject) {
    return this.makePutCall(environment.API_URL + '/ceremony', ceremonyObject);
  }
}
