import { Component, OnInit, ViewChildren, NgZone, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './../_services';
import { LoginResponseModel } from '../_model';
import { AuthService } from '../_auth/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {
  public loginForm: FormGroup;
  public userDetails = new LoginResponseModel();
  constructor(public loginService: LoginService, public router: Router, private auth: AuthService) { }

  ngOnInit() {
    this.createLoginForm();
  }
  userLogin() {
    this.loginService.getLogin(this.loginForm.value).subscribe((response: LoginResponseModel) => {
      this.userDetails = response as LoginResponseModel;
      if (this.userDetails && this.userDetails.status && this.userDetails.data) {
        sessionStorage.setItem('user', JSON.stringify(this.userDetails.data));
        this.auth.sendToken(this.userDetails.data.token);
        this.router.navigate(['/gift']);
      }
    }, (error: any) => {
      console.log(error);
    });
  }
  private createLoginForm() {
    this.loginForm = new FormGroup({
      username: new FormControl('super_customer', [Validators.required]),
      password: new FormControl('customer123', [Validators.required])
    });
  }
  ngAfterViewInit() {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/gift']);
    } else {
      this.auth.logout();
    }
  }
}
