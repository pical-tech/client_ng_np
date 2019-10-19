import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    $('.navbar-nav>li>a').on('click', () => {
      $('.navbar-collapse').collapse('hide');
    });
  }
  logOut() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
