import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AutenticacionService } from 'src/app/services/autenticacion/autenticacion.service';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionGuard implements CanActivate {
  constructor(
      private autenticacionService: AutenticacionService,
      private router: Router
    ) {}

    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ):
      | Observable<boolean | UrlTree>
      | Promise<boolean | UrlTree>
      | boolean
      | UrlTree {
      const autenticado = this.autenticacionService.autenticado();

      if (!autenticado) {
        this.router.navigate(['/']);
      }

      return true;
    }
}
