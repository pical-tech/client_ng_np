import { Component, OnInit } from '@angular/core';
import { GuestService, GlobaleventifierService, LoaderService } from './../../_services';
import { GuestResponseModel, GuestRSVPList, EventResponseData, GuestApprovalResponseModel, GuestApprovalList } from './../../_model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-rsvp',
  templateUrl: './rsvp.component.html',
  styleUrls: ['./rsvp.component.scss']
})
export class RsvpComponent implements OnInit {
  public guestRSVPList: Array<GuestRSVPList> = [];
  public guestApprovalList: Array<GuestApprovalList> = [];
  public activeEvent = new EventResponseData();
  public defaultChoice: string;
  constructor(private guestService: GuestService, private loaderService: LoaderService, private toastr: ToastrService, private globaleventifier: GlobaleventifierService) {
    this.activeEvent = this.globaleventifier.getActiveEvents() ? this.globaleventifier.getActiveEvents() as EventResponseData : null;
  }

  ngOnInit() {
    this.getRSVPList();
    this.guestApproval();
  }
  getRSVPList() {
    this.guestService.getRSVPList().subscribe((response: GuestResponseModel) => {
      if (response && response.data) {
        this.guestRSVPList = response.data.rows as GuestRSVPList[];
      }
    }, (error: Error) => {
      console.log(error);
    });
  }
  guestApproval() {
    this.guestService.guestApprovalList().subscribe((response: GuestApprovalResponseModel) => {
      if (response && response.data && response.data.rows && response.data.rows.length && response.data.rows.length > 0) {
        this.guestApprovalList = response.data.rows as GuestApprovalList[];
        this.guestApprovalList = response.data.rows.filter((item) => {
          if (item.approval_state === 'requested') {
            return item;
          }
        });
      }
    }, (error: Error) => {
      console.log(error);
    });
  }
  updateguestState(guest, state) {
    this.loaderService.show();
    const request = {
      id: +this.activeEvent.id,
      is_co_owner: false,
      approval_state: state
    };
    this.guestService.updateguestState(request).subscribe((res: any) => {
      if (res && !res.is_error) {
        this.toastr.success('Guest status updated', '', { timeOut: 3000, progressBar: true, closeButton: true });
        this.guestApproval();
      }
      this.loaderService.hide();
    }, (error: any) => {
      this.loaderService.hide();
    });
  }
  /* To copy Text from Textbox */
  copyInputMessage(inputElement) {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
    this.toastr.success('Copypeid successfull', '', { timeOut: 3000, progressBar: true, closeButton: true });
  }
}
