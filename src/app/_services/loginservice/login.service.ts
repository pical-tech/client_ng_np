import { Injectable } from '@angular/core';
import { BaseProviderService } from '../BaseProvider.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends BaseProviderService {

  constructor(public http: HttpClient) {
    super(http);
  }

  getLogin(loginObject) {
    return this.makePostCall(environment.API_URL + '/api/v1/users/login', loginObject);
  }
}
