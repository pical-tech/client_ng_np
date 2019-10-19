import { Component, OnInit, ViewChildren, NgZone, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService, LoaderService } from './../_services';
import { LoginResponseModel, EventResponseModel } from '../_model';
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
  public event_time: Date;
  public activeCard = 'LOGIN';
  // public activeCard = 'EVENTREGISTER';
  public minDate = new Date();
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
        this.router.navigate(['/event']);
        // this.loginService.getUserEvent().subscribe((res: EventResponseModel) => {
        //   if (res && !res.is_error && res.data && res.data.rows && res.data.rows.length) {
        //   } else {
        //     // this.router.navigate(['']);
        //   }
        // }, (error: any) => {
        //   this.loaderService.hide();
        // });
      } else {
        this.loaderService.hide();
      }
    }, (error: any) => {
      this.toastr.error('please try again !!', 'Invalid username or password !!', { timeOut: 3000, progressBar: true, closeButton: true });
      this.loaderService.hide();
    });
  }
  userSignUp() {
    if (this.signUpForm.valid) {
      this.loaderService.show();
      this.loginService.creatUser(this.signUpForm.value).subscribe((response: LoginResponseModel) => {
        this.userDetails = response as LoginResponseModel;
        if (this.userDetails && this.userDetails.status && typeof this.userDetails.data !== 'undefined' && !this.userDetails.is_error) {
          sessionStorage.setItem('user', JSON.stringify(this.userDetails.data));
          this.auth.sendToken(this.userDetails.data.token);
          this.toastr.success(this.userDetails.data.user_name, 'Welcome', { timeOut: 3000, progressBar: true, closeButton: true });
          this.router.navigate(['/event']);
        } else {
          this.toastr.error('please try again !!', 'something wrong !!', { timeOut: 3000, progressBar: true, closeButton: true });
          this.loaderService.hide();
        }
      }, (error: any) => {
        this.toastr.error('please try again !!', 'Invalid username or password !!', { timeOut: 3000, progressBar: true, closeButton: true });
        this.loaderService.hide();
      });
    }
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
      phone_no: new FormControl(null, [Validators.required, Validators.maxLength(10), Validators.minLength(10)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      gender: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.maxLength(15)])
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
