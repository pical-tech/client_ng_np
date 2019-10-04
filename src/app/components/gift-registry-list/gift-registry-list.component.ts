import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import Swiper from 'swiper';
@Component({
  selector: 'app-gift-registry-list',
  templateUrl: './gift-registry-list.component.html',
  styleUrls: ['./gift-registry-list.component.scss']
})
export class GiftRegistryListComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    const popularSwiper = new Swiper('.most-popular-swiper', {
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
    const productSwiper = new Swiper('.product-swiper', {
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
  itemDetails() {
    this.router.navigate(['/gift-item']);
  }
}
