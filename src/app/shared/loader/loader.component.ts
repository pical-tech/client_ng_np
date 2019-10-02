
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService, LoaderState } from './../../_services';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit, OnDestroy {
  public show = false;
  private subscription: Subscription;
  count = 0;
  constructor(private loaderService: LoaderService) { }
  ngOnInit() {
    this.subscription = this.loaderService.loaderState.subscribe((state: LoaderState) => {
      this.show = state.show;
      this.count = this.count + 1;
      // console.log(this.show, this.count);
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
