import { LoaderService } from './../_services/loaderservice/loader.service';
import { Component, OnInit, ViewChildren, NgZone, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  public signUpForm: FormGroup;
  public userDetails = new LoginResponseModel();
  public activeCard = 'LOGIN';
  constructor(public loginService: LoginService, public router: Router, private auth: AuthService, private toastr: ToastrService, private loaderService: LoaderService) { }

  ngOnInit() {
    this.createLoginForm();
    this.createSignUpForm();
  }
  userLogin() {
    this.loaderService.show();
    this.loginService.getLogin(this.loginForm.value).subscribe((response: LoginResponseModel) => {
      this.userDetails = response as LoginResponseModel;
      if (this.userDetails && this.userDetails.status && typeof this.userDetails.data !== 'undefined' && !this.userDetails.is_error) {
        sessionStorage.setItem('user', JSON.stringify(this.userDetails.data));
        this.auth.sendToken(this.userDetails.data.token);
        this.toastr.success(this.userDetails.data.user_name, 'Welcome', { timeOut: 3000, progressBar: true, closeButton: true });
        this.router.navigate(['/gift']);
        this.loaderService.hide();
      }
      this.loaderService.hide();
    }, (error: any) => {
      this.toastr.error('please try again !!', 'Invalid username or password !!', { timeOut: 3000, progressBar: true, closeButton: true });
      this.loaderService.hide();
    });
  }
  userSignUp() {
    this.loginService.creatUser(this.signUpForm.value).subscribe((response: LoginResponseModel) => {
      console.log(response);
      this.userDetails = response as LoginResponseModel;
      if (this.userDetails && this.userDetails.status && typeof this.userDetails.data !== 'undefined' && !this.userDetails.is_error) {
        sessionStorage.setItem('user', JSON.stringify(this.userDetails.data));
        this.auth.sendToken(this.userDetails.data.token);
        this.toastr.success(this.userDetails.data.user_name, 'Welcome', { timeOut: 3000, progressBar: true, closeButton: true });
        this.router.navigate(['/gift']);
        this.loaderService.hide();
      } else {
        this.toastr.error('please try again !!', 'something wrong !!', { timeOut: 3000, progressBar: true, closeButton: true });
        this.loaderService.hide();
      }
    }, (error: any) => {
      this.toastr.error('please try again !!', 'Invalid username or password !!', { timeOut: 3000, progressBar: true, closeButton: true });
      this.loaderService.hide();
    });
  }
  private createLoginForm() {
    this.loginForm = new FormGroup({
      username: new FormControl('super_customer', [Validators.required]),
      password: new FormControl('customer123', [Validators.required])
    });
  }
  private createSignUpForm() {
    this.signUpForm = new FormGroup({
      user_name: new FormControl(null, [Validators.required]),
      phone_no: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      gender: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    });
  }
  loginCard(card) {
    this.activeCard = card;
  }
  ngAfterViewInit() {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/gift']);
    } else {
      this.auth.logout();
    }
  }
}
