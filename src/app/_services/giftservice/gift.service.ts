import { Injectable } from '@angular/core';
import { BaseProviderService } from './../BaseProvider.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GiftService extends BaseProviderService {

  constructor(public http: HttpClient) {
    super(http);
  }
  getInventoryList() {
    return this.makeGetCall(environment.PICAL + '/inventory');
  }
  addRegistry(registry) {
    return this.makePutCall(environment.API_URL + '/events', registry);
  }
}
