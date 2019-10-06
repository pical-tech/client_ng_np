import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gift-registry-list',
  templateUrl: './gift-registry-list.component.html',
  styleUrls: ['./gift-registry-list.component.scss']
})
export class GiftRegistryListComponent implements OnInit {

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
