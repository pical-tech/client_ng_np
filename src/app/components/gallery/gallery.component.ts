import { Component, OnInit, HostBinding, HostListener, ViewChildren, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { GalleryService, GlobaleventifierService, LoaderService } from './../../_services';
import { CeremonysModel, EventResponseData, GalleryResponseModel, GalleryData, GalleryListModel } from './../../_model';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, Observer } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import Plyr from 'plyr';
import Swiper from 'swiper';
import { Router } from '@angular/router';
import { PlyrComponent } from 'ngx-plyr';
declare const $: any;

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  public ceremony: Array<CeremonysModel>;
  public activeId: string;
  public photoSwitch = true;
  public ceremonyForm: FormGroup;
  public galleryListType: Array<GalleryListModel> = [];
  public imageLoader = true;
  public activeEvent = new EventResponseData();
  public ceremonies: Array<GalleryData> = [];
  public imagePreview: Array<any> = [];
  public imageViewSlider = new Swiper();
  public activeTab = new CeremonysModel();
  public photoGallery: Array<GalleryListModel> = [];
  public player: Plyr;
  @ViewChild('vedioTag', { static: true }) vedioTag: ElementRef;
  @ViewChild(PlyrComponent, { static: true }) plyr: PlyrComponent;
  public options: Plyr.Options = {
    captions: { active: true, update: true, language: 'en', volume: true },
  };
  // public dashjsDriver1 = new DashjsPlyrDriver(true);
  constructor(private galleryService: GalleryService, public sanitizer: DomSanitizer, private toastr: ToastrService, private globaleventifier: GlobaleventifierService, private router: Router, public loaderService: LoaderService) {
    this.activeEvent = this.globaleventifier.getActiveEvents() ? this.globaleventifier.getActiveEvents() as EventResponseData : null;
  }

  ngOnInit() {
    this.getGallaryDetails();
    this.swiperSliderInit();
    this.loaderService.show();
    this.createCeremonyForm();
  }
  getGallaryDetails() {
    this.galleryService.getGallary(this.activeEvent.id).subscribe((response: GalleryResponseModel) => {
      if (response && response.data && !response.is_error && response.data) {
        this.ceremonies = response.data as GalleryData[];
        if (this.ceremonies && this.ceremonies.length === 0) {
          this.toastr.info('And get back to gallery', 'Please add Ceremonies!!', { timeOut: 3000, progressBar: true, closeButton: true });
          this.router.navigate(['/ceremony']);
        } else if (this.ceremonies && this.ceremonies.length > 0) {
          this.activeId = this.ceremonies[0].ceremony_id;
          this.ceremonyForm.patchValue({
            ceremony_id: this.activeId
          });
          this.photoGallery = this.ceremonies[0].gallery ? this.ceremonies[0].gallery : [] as GalleryListModel[];
          this.openCeremony(this.ceremonies[0]);
        }
        this.loaderService.hide();
      } else {
        this.loaderService.hide();
        this.toastr.error('Please try again.', 'something went wrong!!', { timeOut: 3000, progressBar: true, closeButton: true });
        this.router.navigate(['/event']);
      }
    }, (error: any) => {
      console.log(error);
      this.loaderService.hide();
      this.toastr.error('Please try again.', 'something went wrong!!', { timeOut: 3000, progressBar: true, closeButton: true });
      this.router.navigate(['/event']);
    });
  }
  openCeremony(ceremony) {
    this.activeId = ceremony.ceremony_id;
    this.galleryListType = ceremony.gallery as GalleryListModel[];

    this.getPhotoDetails('PHOTO');
  }
  getClassActive(ceremony) {
    return this.activeId === ceremony.ceremony_id;
  }
  getPhotoDetails(type) {
    this.imageLoader = true;
    if (type === 'PHOTO') {
      this.photoSwitch = true;
    }
    if (type === 'VIDEO') {
      this.photoSwitch = false;
    }
    this.photoGallery = this.galleryListType.filter((item) => {
      if (item.medea_type.toLowerCase() === 'photo') {
        this.getImageSrc(item.medea_url).then((res: string) => {
          item.medea_url = res;
        });
      }
      return item.medea_type.toLowerCase() === type.toLowerCase();
    });
  }
  getImageSrc(path: string): Promise<any> {
    return new Promise(async resolve => {
      const img = new Image();
      img.src = path;
      this.imageLoader = false;
      img.onload = () => resolve(img.src);
      img.onerror = () => resolve('assets/images/placeholder.png');
    });
  }
  uploadFile() {
    if (this.imagePreview && this.imagePreview.length > 0 && this.ceremonyForm.valid) {
      this.loaderService.show();
      console.log(this.imagePreview);
      console.log(this.ceremonyForm.value);
      const fileList = this.imagePreview.filter((item) => {
        if (this.ceremonyForm.controls.medea_type.value === item.media_type) {
          return item.file;
        }
      });
      if (fileList && fileList.length && fileList.length > 0) {
        const formData = new FormData();
        for (const file of fileList) {
          formData.append('images', file.file);
        }
        formData.append('event_id', this.activeEvent.id);
        this.galleryService.postS3Media(formData).subscribe((response: any) => {
          if (response && !response.is_error && response.data && response.data.length && response.data.length > 0) {
            const medeaInfo = [];
            const request = {
              event_id: +this.activeEvent.id,
              ceremony_id: +this.ceremonyForm.controls.ceremony_id.value,
              medea_info: [],
              is_public: true
            };
            if (typeof response.data === 'string') {
              request.medea_info.push({ medea_url: response.data, medea_type: this.ceremonyForm.controls.medea_type.value });
            } else {
              response.data.forEach(item => {
                request.medea_info.push({ medea_url: item, medea_type: this.ceremonyForm.controls.medea_type.value });
              });
            }
            this.galleryService.postS3Url(request).subscribe((res: any) => {
              if (res && !res.is_error && res.data && res.data.length && res.data.length > 0) {
                this.toastr.success('', 'Successfully uploaded', { timeOut: 3000, progressBar: true, closeButton: true });
                this.imagePreview = [];
                this.loaderService.hide();
                this.getGallaryDetails();
              } else {
                this.imagePreview = [];
                this.loaderService.hide();
                this.toastr.error('Please try after some time.', 'Something went wrong !!', { timeOut: 3000, progressBar: true, closeButton: true });
              }
            }, (error: any) => {
              this.imagePreview = [];
              this.toastr.error('Please try after some time.', 'Something went wrong !!', { timeOut: 3000, progressBar: true, closeButton: true });
              this.loaderService.hide();
            });
          } else {
            this.toastr.info('Please try after some time.', 'Something went wrong !!', { timeOut: 3000, progressBar: true, closeButton: true });
            this.loaderService.hide();
          }

        }, (error: any) => {
          this.toastr.error('Please try after some time.', 'Something went wrong !!', { timeOut: 3000, progressBar: true, closeButton: true });
          this.loaderService.hide();
        });
      } else {
        this.toastr.warning('', 'Please select valid file\s Or Photo\'s', { timeOut: 3000, progressBar: true, closeButton: true });
        this.loaderService.hide();
      }
    } else {
      this.toastr.warning('', 'Please select valid file\s Or Photo\'s', { timeOut: 3000, progressBar: true, closeButton: true });
    }
  }
  handleFileInput(files: FileList) {
    this.loaderService.show();
    if (files && files.length && files.length > 0) {
      const filesAmount = files.length;
      for (let i = 0; i < filesAmount; i++) {
        const reader = new FileReader();
        reader.onload = (event: any) => {
          if (event.target.result.includes('data:image/')) {
            this.imagePreview.push({
              media_type: 'PHOTO',
              url: event.target.result,
              file: files[i]
            });
          } else if (event.target.result.includes('data:video')) {
            this.imagePreview.push({
              media_type: 'VIDEO',
              url: event.target.result,
              file: files[i]
            });
          } else {
            this.imagePreview.push({
              media_type: 'PHOTO',
              url: 'assets/images/placeholder.png',
              file: files[i]
            });
          }
          // this.imagePreview.push(event.target.result);
        };
        reader.readAsDataURL(files[i]);
      }
      $('#imageView').modal('show');
      $('#imageView').css('opacity', 0);
      setTimeout(() => {
        this.imageViewSlider.update();
        this.loaderService.hide();
        $('#imageView').css('opacity', 1);
      }, 2000);
    } else {
      this.loaderService.hide();
    }
  }
  swiperSliderInit() {
    this.imageViewSlider = new Swiper('.image-view-swiper', {
      slidesPerView: 1,
      spaceBetween: 10,
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
      mousewheel: false,
      keyboard: true,
    });
  }
  openImageModel() {
    $('#imageView').modal('show');
  }
  removeImage(data) {
    if (this.imagePreview && this.imagePreview.length > 0) {
      this.imagePreview = this.imagePreview.filter((item) => {
        if (item.file.name !== data.file.name) {
          return item;
        }
      });
      setTimeout(() => {
        this.imageViewSlider.update();
        $('#customerFile').val(null);
      }, 500);
      if (this.imagePreview.length === 0) {
        $('#imageView').modal('hide');
      }
    }
  }
  private createCeremonyForm() {
    this.ceremonyForm = new FormGroup({
      event_id: new FormControl(+this.activeEvent.id, [Validators.required]),
      ceremony_id: new FormControl(null, [Validators.required]),
      medea_type: new FormControl('PHOTO', [Validators.required])
    });
  }
  played(event: Plyr.PlyrEvent) {
    console.log('played', event);
  }
  // @HostListener('click')
  // onClick() {
  //   const vv = document.getElementById('imageView');
  //   const model = document.getElementsByClassName('modal-backdrop');
  //   console.log(model);
  //   if (model.length > 0 && vv.className.includes('show')) {
  //     vv.addEventListener('click', (event: any) => {
  //       if (event && event.path) {
  //         for (const e of event.path) {
  //           if (e.className && e.className.includes('swiper-container image-view-swiper swiper-container-initialized swiper-container-horizontal')) {
  //             if (!!e.getElementsByTagName('video')[0].play()) {
  //               e.getElementsByTagName('video')[0].pause();
  //             }
  //           }
  //         }
  //       }
  //     });
  //   }
  // }
}
