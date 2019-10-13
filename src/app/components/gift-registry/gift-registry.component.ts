import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { GiftService } from './../../_services';
declare const $: any;
@Component({
  selector: 'app-gift-registry',
  templateUrl: './gift-registry.component.html',
  styleUrls: ['./gift-registry.component.scss']
})
export class GiftRegistryComponent implements OnInit {
  public registry: FormGroup;
  private date = new Date();
  public minDateStart = new Date();
  public minDateEnd = new Date();
  public maxDateStart = new Date((new Date().getFullYear() + 2).toString());
  constructor(private router: Router, private giftService: GiftService) {

  }

  ngOnInit() {
    this.registryForm();
  }
  openRegister() {
    $('#registerRegistry').modal('show');
  }
  addRegistryForm() {
    this.giftService.addRegistry(this.registry.value).subscribe((response: any) => {
      console.log(response);
    }, (error: any) => {
      console.log(error);
    });
    console.log(this.registry.value);
  }
  dateChangeStart() {
    if (this.registry.controls.registry_start_date.valid && this.registry.controls.registry_start_date.value) {
      this.minDateEnd = this.registry.get('registry_start_date').value;
    }
    this.registry.patchValue({ registry_start_date: new DatePipe(navigator.language).transform(this.registry.get('registry_start_date').value, 'y-MM-dd') });
  }
  dateChangeEnd() {
    if (this.registry.controls.registry_end_date.valid && this.registry.controls.registry_end_date.value) {
      this.maxDateStart = this.registry.get('registry_end_date').value;
    }
    this.registry.patchValue({ registry_end_date: new DatePipe(navigator.language).transform(this.registry.get('registry_end_date').value, 'y-MM-dd') });
  }
  skipRegister() {
    $('#registerRegistry').modal('hide');
    this.router.navigate(['/registry']);
  }
  private registryForm() {
    this.registry = new FormGroup({
      registry_start_date: new FormControl(this.minDateStart, [Validators.required]),
      registry_end_date: new FormControl(this.minDateEnd, [Validators.required]),
      registry_owner: new FormControl(null, [Validators.required]),
      address: new FormControl(null, [Validators.required])
    });
  }
}
