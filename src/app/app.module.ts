import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpInterceptor } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdminlayoutComponent } from './layout/adminlayout/adminlayout.component';
import { UserlayoutComponent } from './layout/userlayout/userlayout.component';

import { ToastrModule, ToastrService } from 'ngx-toastr';
import { GiftRegistryComponent } from './components/gift-registry/gift-registry.component';
import { AuthService } from './_auth/auth.service';
import { AuthGuard } from './_auth/auth.guard';
import { SharedModule } from './shared/shared.module';
import { RouterModule } from '@angular/router';
import { GalleryComponent } from './components/gallery/gallery.component';
import { JwtModule, JWT_OPTIONS } from './../package';
import { GalleryService } from './_services/gallery/gallery.service';
import { CeremonyComponent } from './components/ceremony/ceremony.component';
import { EventsComponent } from './components/events/events.component';
import { RsvpComponent } from './components/rsvp/rsvp.component';
import { GiftRegistryListComponent } from './components/gift-registry-list/gift-registry-list.component';
import { GiftDetailComponent } from './components/gift-registry-list/gift-detail/gift-detail.component';
import { ProductListComponent } from './components/gift-registry-list/product-list/product-list.component';
import { GiftFormComponent } from './components/gift-registry-list/gift-form/gift-form.component';

export function jwtOptionsFactory() {
  return {
    tokenGetter: () => {
      return (sessionStorage.getItem('token') ? sessionStorage.getItem('token') : null);
    }
  };
}
export const MY_MOMENT_FORMATS = {
  parseInput: 'l LT',
  fullPickerInput: 'l LT',
  datePickerInput: 'l',
  timePickerInput: 'LT',
  monthYearLabel: 'MMM YYYY',
  dateA11yLabel: 'LL',
  monthYearA11yLabel: 'MMMM YYYY',
};
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminlayoutComponent,
    UserlayoutComponent,
    GiftRegistryComponent,
    GalleryComponent,
    CeremonyComponent,
    EventsComponent,
    RsvpComponent,
    GiftRegistryListComponent,
    GiftDetailComponent,
    ProductListComponent,
    GiftFormComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    ToastrModule.forRoot(),
    SharedModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
      }
    }),
  ],
  providers: [AuthService, AuthGuard, GalleryService, ToastrService],
  bootstrap: [AppComponent]
})
export class AppModule { }
