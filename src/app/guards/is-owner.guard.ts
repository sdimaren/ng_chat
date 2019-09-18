import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { map, take, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IsOwnerGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router,
    private toastrService: ToastrService
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
    
      return this.auth.currentUser.pipe(
        take(1),
        map((currentUser) => !!currentUser && currentUser.id === next.params.userId),
        tap((isOwner) => {
          if (!isOwner) {
            this.toastrService.error("You can only edit your profile.");
            this.router.navigate(['/login'], {queryParams: { returnUrl: state.url}});
          }
        })
      )
  }
}
