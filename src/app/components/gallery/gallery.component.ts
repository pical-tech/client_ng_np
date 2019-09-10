import { Component, OnInit } from '@angular/core';
import { GalleryService } from './../../_services';
import { GalleryResponseModel, CeremonyModel, GalleryListModel } from './../../_model';

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
  constructor(private galleryService: GalleryService) { }

  ngOnInit() {
    this.galleryService.getGallary().subscribe((response: GalleryResponseModel) => {
      this.galleryResponse = response as GalleryResponseModel;
      if (this.galleryResponse && this.galleryResponse.data && this.galleryResponse.data.rows) {
        this.galleryList = this.galleryResponse.data.rows as GalleryListModel[];
        const temp = this.galleryList.filter(x => x.ceremony).map(x => x.ceremony_id);
        const ceremonyId = Array.from(new Set(this.galleryList.map(x => x)));
        const temp2 = this.galleryList.filter(item => {
          // return ceremonyId.indexOf(item.ceremony_id)
        });
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
    if (type === 'Photo') {
      this.photoSwitch = true;
    }
    if (type === 'Video') {
      this.photoSwitch = false;
    }
    this.galleryList.forEach(item => {
      if (item.ceremony_id === this.activeId && item.medea_type === type) {
        temp.push(item);
      }
    });
    this.galleryListType = temp;
  }
}
