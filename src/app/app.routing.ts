import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminlayoutComponent } from './layout/adminlayout/adminlayout.component';
import { UserlayoutComponent } from './layout/userlayout/userlayout.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: AdminlayoutComponent, children: [] },
  { path: '404', component: UserlayoutComponent, children: [] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
