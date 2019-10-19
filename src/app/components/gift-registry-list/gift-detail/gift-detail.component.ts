import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GiftService, LoaderService } from './../../../_services';
import { ProductResponseModel, ProductDetailsModel } from './../../../_model';

@Component({
  selector: 'app-gift-detail',
  templateUrl: './gift-detail.component.html',
  styleUrls: ['./gift-detail.component.scss']
})
export class GiftDetailComponent implements OnInit {
  public productId: string;
  public productDetail = new ProductDetailsModel();

  constructor(private route: ActivatedRoute, private router: Router, private toastr: ToastrService, private giftService: GiftService, private loaderService: LoaderService) {
    this.route.params.subscribe(params => {
      if (params && params.id) {
        this.productId = params.id;
        this.getProductDetails();
      } else {
        this.toastr.error('', 'Please select product', { timeOut: 3000, progressBar: true, closeButton: true });
        this.router.navigate(['/registry']);
      }
    });
  }

  ngOnInit() {
  }
  getProductDetails() {
    this.loaderService.show();
    this.giftService.getProductDetails(this.productId).subscribe((response: ProductResponseModel) => {
      if (response && !response.is_error && response.data && response.data.id) {
        this.productDetail = response.data as ProductDetailsModel;
      }
      this.loaderService.hide();
    }, (error: any) => {
      this.loaderService.hide();
    });
  }
  itemDetails(product) {
    this.router.navigate(['/registry/gift-item/' + product.id]);
    window.scroll({ top: 0, behavior: 'smooth' });
  }

}
