import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-userlayout',
  templateUrl: './userlayout.component.html',
  styleUrls: ['./userlayout.component.scss']
})
export class UserlayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  onActivate(e) {
    window.scroll({ top: 0, behavior: 'smooth' });
  }
  onDeactivate(e) {
    window.scroll({ top: 0, behavior: 'smooth' });
  }
}
