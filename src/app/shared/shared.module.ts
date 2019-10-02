import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from './loader/loader.component';
@NgModule({
  declarations: [NavbarComponent, LoaderComponent],
  imports: [CommonModule, RouterModule],
  exports: [NavbarComponent, LoaderComponent]
})
export class SharedModule { }
