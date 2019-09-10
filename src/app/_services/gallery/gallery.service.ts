import { Injectable } from '@angular/core';
import { BaseProviderService } from './../BaseProvider.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GalleryService extends BaseProviderService {

  constructor(public http: HttpClient) {
    super(http);
  }

  getGallary() {
    return this.makeGetCall(environment.API_URL + '/photoGallery');
  }
}
