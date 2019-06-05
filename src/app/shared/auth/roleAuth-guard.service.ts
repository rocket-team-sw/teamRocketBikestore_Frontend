import { Router } from '@angular/router';
// Tener en cuenta en esta clase las rutas cuando el token no está expirado, esta clase
// permitirá además el enrutamiento entre las páginas cuando el usuario este logueado.

import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { TokenStorageService } from './token-storage.service';

@Injectable()
export class RoleAuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService,
    private tokenStorage: TokenStorageService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {

    const expectedRole: string[] = route.data.expectedRole;
    for (const i in expectedRole) {
      if (this.authService.isAuthenticated()) {
        if (this.tokenStorage.getAuthorities() === expectedRole[i]) {
          return true;
        }
      }
    }
    this.router.navigate(['pages/login']);
    return false;
  }
}
