import { Injectable } from '@angular/core';
import { CanActivate, Route, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap} from 'rxjs/operators'
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      return this.auth.currentUser.pipe(
        take(1),
        map((currentUser) => !!currentUser),
        tap((loggedIn) => {
          console.log(loggedIn);
          if (!loggedIn) {
            this.toastrService.error("Please try again.", "You must be logged in to access that page.");
            this.router.navigate(['/login'], {queryParams: { returnUrl: state.url }});
          }
        })
      )
  }
}
