import { Component, OnInit, ViewChildren, NgZone, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CeremonyService, LoaderService } from './../../_services';
import { CeremonyResponseModel } from './../../_model';
declare const $: any;
@Component({
  selector: 'app-ceremony',
  templateUrl: './ceremony.component.html',
  styleUrls: ['./ceremony.component.scss']
})
export class CeremonyComponent implements OnInit {
  public ceremonyForm: FormGroup;
  public ceremonyEditForm: FormGroup;
  public ceremonyList: Array<CeremonyResponseModel>;
  public minDate = new Date();
  public ceremonyModel = new CeremonyResponseModel();
  constructor(private ceremonyService: CeremonyService, private toastr: ToastrService, private loaderService: LoaderService) { }

  ngOnInit() {
    this.createCeremonyForm();
    this.getCeremony();
    this.createCeremonyEditForm();
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
    this.loaderService.show();
    this.ceremonyService.setCeremony(this.ceremonyForm.value).subscribe((response: any) => {
      if (response && !response.is_error && response.data) {
        this.loaderService.hide();
      } else if (response && response.is_error && response.message) {
        if (response.message.length && response.message.length > 0) {
          for (const error of response.message) {
            this.toastr.error('', error.message, { timeOut: 3000, progressBar: true, closeButton: true });
          }
        }
        this.loaderService.hide();
      } else {
        this.toastr.error('', 'something went wrong !!', { timeOut: 3000, progressBar: true, closeButton: true });
        this.loaderService.hide();
      }
    }, (error: any) => {
      this.loaderService.hide();
      console.log(error);
    });
  }
  editCeremony(ceremonyModel: CeremonyResponseModel) {
    this.ceremonyModel = ceremonyModel as CeremonyResponseModel;
    this.ceremonyEditForm.patchValue({
      id: +this.ceremonyModel.id,
      title: this.ceremonyModel.title,
      venue: this.ceremonyModel.venue,
      date_time: new DatePipe(navigator.language).transform(this.ceremonyModel.date_time, 'y-MM-dd'),
      description: this.ceremonyModel.description,
    });
    $('#ceremonyModelPopUp').modal('show');
    console.log(this.ceremonyEditForm.value);
  }
  editCeremonyForm() {
    this.loaderService.show();
    this.ceremonyService.updateCeremony(this.ceremonyEditForm.value).subscribe((response: any) => {
      if (response && !response.is_error && response.data) {
        this.loaderService.hide();
        this.toastr.success('', 'Ceremony successfully update', { timeOut: 3000, progressBar: true, closeButton: true });
        this.getCeremony();
        $('#ceremonyModelPopUp').modal('hide');
      } else if (response && response.is_error && response.message) {
        if (response.message.length && response.message.length > 0) {
          for (const error of response.message) {
            this.toastr.error('', error.message, { timeOut: 3000, progressBar: true, closeButton: true });
          }
        }
        this.loaderService.hide();
      } else {
        this.toastr.error('', 'something went wrong !!', { timeOut: 3000, progressBar: true, closeButton: true });
        this.loaderService.hide();
      }
    }, (error: any) => {
      this.loaderService.hide();
      console.log(error);
    });
  }
  dateChange() {
    this.ceremonyForm.patchValue({ date_time: new DatePipe(navigator.language).transform(this.ceremonyForm.get('date_time').value, 'y-MM-dd') });
    console.log(this.ceremonyForm.get('date_time').value);
  }
  dateChangeEdit() {
    this.ceremonyEditForm.patchValue({ date_time: new DatePipe(navigator.language).transform(this.ceremonyEditForm.get('date_time').value, 'y-MM-dd') });
  }
  private createCeremonyForm() {
    this.ceremonyForm = new FormGroup({
      event_id: new FormControl(12, [Validators.required]),
      title: new FormControl(null, [Validators.required]),
      venue: new FormControl(null, [Validators.required]),
      date_time: new FormControl(null, [Validators.required, Validators.pattern(/^((19|20)\d{2})\-(0[1-9]|1[0-2])\-(0[1-9]|1\d|2\d|3[01])$/)]),
      description: new FormControl(null, [Validators.required])
    });
  }
  private createCeremonyEditForm() {
    this.ceremonyEditForm = new FormGroup({
      id: new FormControl(null, [Validators.required]),
      title: new FormControl(null, [Validators.required]),
      venue: new FormControl(null, [Validators.required]),
      date_time: new FormControl(null, [Validators.required, Validators.pattern(/^((19|20)\d{2})\-(0[1-9]|1[0-2])\-(0[1-9]|1\d|2\d|3[01])$/)]),
      description: new FormControl(null, [Validators.required])
    });
  }
}
