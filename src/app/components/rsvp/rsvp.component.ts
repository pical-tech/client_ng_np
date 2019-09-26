import { Component, OnInit } from '@angular/core';
import { GuestService } from './../../_services';
import { GuestResponseModel, GuestRSVPList } from './../../_model';

@Component({
  selector: 'app-rsvp',
  templateUrl: './rsvp.component.html',
  styleUrls: ['./rsvp.component.scss']
})
export class RsvpComponent implements OnInit {
  public guestRSVPList: Array<GuestRSVPList>;
  constructor(private guestService: GuestService) { }

  ngOnInit() {
    this.getRSVPList();
  }
  getRSVPList() {
    this.guestService.getRSVPList().subscribe((response: GuestResponseModel) => {
      if (response && response.data) {
        this.guestRSVPList = response.data.rows as GuestRSVPList[];
      }
      console.log(response);
    }, (error: Error) => {
      console.log(error);
    });
  }
}
