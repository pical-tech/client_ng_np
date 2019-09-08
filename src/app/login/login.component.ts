import { Component, OnInit, ViewChildren, NgZone, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './../_services';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  constructor(public loginService: LoginService) { }

  ngOnInit() {
    this.createLoginForm();
  }
  userLogin() {
    this.loginService.getLogin(this.loginForm.value).subscribe((response: any) => {
      console.log(response);
    }, (error: any) => {
      console.log(error);
    });
  }
  private createLoginForm() {
    this.loginForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    });
  }
}
