import { Inject, Injectable, inject } from '@angular/core';
import { UserService } from './user.service';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, lastValueFrom } from 'rxjs';

@Injectable(
  { providedIn: 'root' }
)
export class AuthGuardService {

  constructor(
    @Inject(UserService) private auth: UserService,
    private router: Router
  ) { }


  canActivate(): boolean {
    if (this.auth.get_token() != "") {
      console.log("OK")
      return true;
    } else {
      console.log("BAD")
      this.router.navigate(["signin"])
      return false;
    }

  }



}

export const authGuard: CanActivateFn = (route, state) => {
  return inject(AuthGuardService).canActivate();
}
