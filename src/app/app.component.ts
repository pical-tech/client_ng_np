import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client-ng-np';
  onActivate(e) {
    window.scroll({ top: 0, behavior: 'smooth' });
  }
  onDeactivate(e) {
    window.scroll({ top: 0, behavior: 'smooth' });
  }
}
