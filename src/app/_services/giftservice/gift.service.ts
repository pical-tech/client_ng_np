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
    return this.makeGetCall(environment.API_URL + '/inventory');
  }
  addRegistry(registry) {
    return this.makePutCall(environment.API_URL + '/events', registry);
  }
  getProductDetails(productId) {
    return this.makeGetCall(environment.API_URL + '/inventory/' + productId);
  }
  getMyRegistry() {
    return this.makeGetCall(environment.API_URL + '/giftRegistry');
  }
}
