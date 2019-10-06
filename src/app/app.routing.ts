
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './_auth/auth.guard';
import { LoginComponent } from './login/login.component';
import { AdminlayoutComponent } from './layout/adminlayout/adminlayout.component';
import { UserlayoutComponent } from './layout/userlayout/userlayout.component';
import { GiftRegistryComponent } from './components/gift-registry/gift-registry.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { CeremonyComponent } from './components/ceremony/ceremony.component';
import { EventsComponent } from './components/events/events.component';
import { RsvpComponent } from './components/rsvp/rsvp.component';
import { GiftRegistryListComponent } from './components/gift-registry-list/gift-registry-list.component';
import { ProductListComponent } from './components/gift-registry-list/product-list/product-list.component';
import { GiftDetailComponent } from './components/gift-registry-list/gift-detail/gift-detail.component';
import { GiftFormComponent } from './components/gift-registry-list/gift-form/gift-form.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '', component: AdminlayoutComponent, canActivateChild: [AuthGuard],
    children: [
      { path: 'gift', component: GiftRegistryComponent },
      { path: 'gallery', component: GalleryComponent },
      { path: 'ceremony', component: CeremonyComponent },
      { path: 'event', component: EventsComponent },
      { path: 'guest', component: RsvpComponent },
      {
        path: 'registry', component: GiftRegistryListComponent,
        children: [
          { path: '', component: GiftFormComponent },
          { path: 'product', component: ProductListComponent },
          { path: 'gift-item', component: GiftDetailComponent }
        ]
      },
      { path: '**', redirectTo: 'gallery', pathMatch: 'full' }
    ]
  },
  { path: '404', component: UserlayoutComponent, children: [] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
