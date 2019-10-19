import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { GiftService } from './../../../_services';
import Swiper from 'swiper';
import { InventoryResponseModel, InventoryResponse } from './../../../_model';
@Component({
  selector: 'app-gift-form',
  templateUrl: './gift-form.component.html',
  styleUrls: ['./gift-form.component.scss']
})
export class GiftFormComponent implements OnInit, AfterViewInit {
  public inventoryList: Array<InventoryResponseModel>;
  public popularSwiper = new Swiper();
  public productSwiper = new Swiper();
  constructor(private router: Router, private giftService: GiftService) {
  }

  ngOnInit() {
    this.getInventory();
    this.swiperUpdate();
  }
  getInventory() {
    this.giftService.getInventoryList().subscribe((response: InventoryResponse) => {
      if (response && response.data && !response.is_error) {
        this.inventoryList = response.data.rows as InventoryResponseModel[];
      }
    }, (error: any) => {

    });
  }

  swiperUpdate() {
    this.popularSwiper = new Swiper('.most-popular-swiper', {
      slidesPerView: 3,
      spaceBetween: 30,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      // Disable preloading of all images
      preloadImages: false,
      // Enable lazy loading
      lazy: true,
      loop: true,
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      },
      mousewheel: false,
      keyboard: true,
    });
    this.productSwiper = new Swiper('.product-swiper', {
      slidesPerView: 3,
      spaceBetween: 30,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      loop: true,
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      },
      mousewheel: false,
      keyboard: true,
    });
  }
  itemDetails(product) {
    this.router.navigate(['/registry/gift-item/' + product.id]);
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.popularSwiper.update(); this.productSwiper.update();
    }, 2000);
  }
}
