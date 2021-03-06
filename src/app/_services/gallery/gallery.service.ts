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

  getGallary(eventId) {
    return this.makeGetCall(environment.API_URL + '/photoGallery?event_id=' + eventId);
  }
  postS3Media(file) {
    return this.makeUploadCall(environment.API_URL + '/imageUploadToS3/images/events', file);
  }
  postS3Url(request) {
    return this.makePostCall(environment.API_URL + '/photoGallery', request);
  }
}
