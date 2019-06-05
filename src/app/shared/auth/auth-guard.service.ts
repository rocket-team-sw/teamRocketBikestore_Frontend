import { Router, CanActivate, CanActivateChild } from '@angular/router';
// Tener en cuenta en esta clase las rutas cuando el token no está expirado, esta clase
// permitirá además el enrutamiento entre las páginas cuando el usuario este logueado.

import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService,
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['dashboard/dashboard1']);
      return false;
    } else {
      return true;
    }
  }
}
