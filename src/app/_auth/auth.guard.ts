import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private auth: AuthService, private router: Router, private toastr: ToastrService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.auth.isLoggedIn()) {
      if (JSON.parse(sessionStorage.getItem('activeEvent'))) {
        return true;
      } else {
        if (state.url !== '/event') {
          this.toastr.error('', 'please Select Event !!.', { timeOut: 3000, progressBar: true, closeButton: true });
          this.router.navigate(['event']);
        }
        return true;
      }
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }
  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['gift']);
      return true;
    } else {
      return false;
    }
  }
}
