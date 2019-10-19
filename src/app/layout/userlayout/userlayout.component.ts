import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userlayout',
  templateUrl: './userlayout.component.html',
  styleUrls: ['./userlayout.component.scss']
})
export class UserlayoutComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  logOut() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
  onActivate(e) {
    window.scroll({ top: 0, behavior: 'smooth' });
  }
  onDeactivate(e) {
    window.scroll({ top: 0, behavior: 'smooth' });
  }
}
