import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CeremonyService, LoaderService, GlobaleventifierService } from './../../_services';
import { CeremonyResponseModel, EventResponseData } from './../../_model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-gift-registry-list',
  templateUrl: './gift-registry-list.component.html',
  styleUrls: ['./gift-registry-list.component.scss']
})
export class GiftRegistryListComponent implements OnInit {
  public activeEvent = new EventResponseData();
  constructor(private router: Router, private toastr: ToastrService, private globaleventifier: GlobaleventifierService, private ceremonyService: CeremonyService, private loaderService: LoaderService) {
    this.activeEvent = this.globaleventifier.getActiveEvents() ? this.globaleventifier.getActiveEvents() as EventResponseData : null;
  }

  ngOnInit() {
  }
  onActivate(e) {
    window.scroll({ top: 0, behavior: 'smooth' });
  }
  onDeactivate(e) {
    window.scroll({ top: 0, behavior: 'smooth' });
  }
}
