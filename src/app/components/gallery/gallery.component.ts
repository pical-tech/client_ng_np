import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { GalleryService } from './../../_services';
import { GalleryResponseModel, CeremonyModel, GalleryListModel } from './../../_model';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  public galleryResponse = new GalleryResponseModel();
  public ceremony: Array<CeremonyModel>;
  public galleryList: Array<GalleryListModel>;
  public ceremonyTitle: Array<any>;
  public galleryListType: Array<GalleryListModel>;
  public activeId: string;
  public photoSwitch = true;
  public ceremonyForm: FormGroup;
  public imageLoader = true;
  constructor(private galleryService: GalleryService, public sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.createCeremonyForm();
    this.galleryService.getGallary().subscribe((response: GalleryResponseModel) => {
      this.galleryResponse = response as GalleryResponseModel;
      if (this.galleryResponse && this.galleryResponse.data && this.galleryResponse.data.rows) {
        this.galleryList = this.galleryResponse.data.rows as GalleryListModel[];
        this.galleryList.filter(x => x.ceremony).map(x => x.ceremony_id);
        Array.from(new Set(this.galleryList.map(x => x)));
        const ceremonyIds = [];
        this.galleryList.forEach(item => { if (item.ceremony) { ceremonyIds.push({ id: item.ceremony.id, title: item.ceremony.title }); } });
        this.ceremonyTitle = [...new Set(ceremonyIds.map(s => JSON.stringify(s)))].map(s => JSON.parse(s));
        this.openCeremony(this.ceremonyTitle[0]);
      }
    }, (error: any) => {
      console.log(error);
    });
  }
  openCeremony(ceremony) {
    const temp = [];
    this.activeId = ceremony.id;
    this.galleryList.forEach(item => {
      if (item.ceremony_id === ceremony.id) {
        item.medea_url_dummy = 'assets/images/placeholder.png';
        temp.push(item);
      }
    });
    this.galleryListType = temp;
    this.getPhotoDetails('Photo');
  }
  getClassActive(ceremony) {
    return this.activeId === ceremony.id;
  }
  getPhotoDetails(type) {
    const temp = [];
    this.imageLoader = true;
    if (type === 'Photo') {
      this.photoSwitch = true;
    }
    if (type === 'Video') {
      this.photoSwitch = false;
    }
    this.galleryList.forEach(async item => {
      if (item.ceremony_id === this.activeId && item.medea_type === type) {
        this.getImageSrc(item.medea_url).then((res) => {
          item.medea_url_dummy = res;
          setTimeout(() => {
            this.imageLoader = false;
          }, 3000);
        });
        temp.push(item);
      }
    });
    this.galleryListType = temp;
  }
  onImageLoad() {

  }
  getImageSrc(path: string): Promise<any> {
    return new Promise(async resolve => {
      const img = new Image();
      img.src = path;
      img.onload = () => resolve(img.src);
      img.onerror = () => resolve('assets/images/placeholder.png');
    });
  }
  uploadFile() {

  }
  getFileDetail($event) {
    console.log($event.target);
  }
  private createCeremonyForm() {
    this.ceremonyForm = new FormGroup({
      event_id: new FormControl(12, [Validators.required]),
      ceremony_id: new FormControl(null, [Validators.required]),
      medea_url: new FormControl(null, [Validators.required]),
      medea_type: new FormControl(null, [Validators.required])
    });
  }
}
