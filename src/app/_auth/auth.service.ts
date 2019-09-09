import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router) { }
  sendToken(token: string) {
    sessionStorage.setItem('token', token);
  }
  getToken() {
    return sessionStorage.getItem('token');
  }
  isLoggedIn() {
    return this.getToken() !== null;
  }
  logout() {
    sessionStorage.removeItem('token');
    this.router.navigate(['login']);
  }
}
