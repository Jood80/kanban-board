import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';
import { SnackService } from 'src/app/shared/services/snack.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AngularFireAuth,
    private snackBarService: SnackService
  ) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const user = await this.authService.currentUser;
    const isLoggedIn = !!user; //convert it into boolean

    if (!isLoggedIn) this.snackBarService.authError();
    return isLoggedIn;
  }
}
