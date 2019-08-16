import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { AutenticacionService } from 'src/app/services/autenticacion/autenticacion.service';

@Injectable({
  providedIn: 'root'
})
export class NoAutenticadoGuard implements CanActivate {
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

    console.log(autenticado);

    if (autenticado) {
      this.router.navigate(['/eventos/']);
    }

    return true;
  }
}
