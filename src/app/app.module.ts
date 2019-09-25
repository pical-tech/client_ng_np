import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpInterceptor } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdminlayoutComponent } from './layout/adminlayout/adminlayout.component';
import { UserlayoutComponent } from './layout/userlayout/userlayout.component';

import { ToastrModule } from 'ngx-toastr';
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

export function jwtOptionsFactory() {
  return {
    tokenGetter: () => {
      return (sessionStorage.getItem('token') ? sessionStorage.getItem('token') : null);
    }
  };
}

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
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    ToastrModule.forRoot(),
    SharedModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
      }
    }),
  ],
  providers: [AuthService, AuthGuard, GalleryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
