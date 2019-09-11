import { Component, OnInit, ViewChildren, NgZone, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { CeremonyService } from './../../_services';
import { CeremonyResponseModel } from './../../_model';

@Component({
  selector: 'app-ceremony',
  templateUrl: './ceremony.component.html',
  styleUrls: ['./ceremony.component.scss']
})
export class CeremonyComponent implements OnInit {
  public ceremonyForm: FormGroup;
  public ceremonyList: Array<CeremonyResponseModel>;
  constructor(private ceremonyService: CeremonyService) { }

  ngOnInit() {
    this.createCeremonyForm();
    this.getCeremony();
  }
  getCeremony() {
    this.ceremonyService.getCeremony().subscribe((response: any) => {
      if (response && response.data && response.data.rows) {
        this.ceremonyList = response.data.rows;
      }
    }, (error: any) => {
      console.log(error);
    });
  }
  addCeremony() {

  }
  private createCeremonyForm() {
    this.ceremonyForm = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      venue: new FormControl(null, [Validators.required]),
      date_time: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required])
    });
  }
}
