import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GiftService, LoaderService } from './../../../_services';
import { GiftrRgistryResponseModel, GiftrRgistryList } from './../../../_model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  public myGiftRegistry: Array<GiftrRgistryList> = [];
  constructor(private giftService: GiftService, private toastr: ToastrService, private loaderService: LoaderService) { }

  ngOnInit() {
    this.giftService.getMyRegistry().subscribe((response: GiftrRgistryResponseModel) => {
      if (response && !response.is_error && response.data && response.data.rows) {
        this.myGiftRegistry = response.data.rows as GiftrRgistryList[];
      }
    }, (error: any) => {
      this.toastr.error('Please try again.', 'something went wrong!!', { timeOut: 3000, progressBar: true, closeButton: true });
    })
  }

}
