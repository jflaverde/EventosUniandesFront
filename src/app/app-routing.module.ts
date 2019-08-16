import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventosListComponent} from './components/eventos-list/eventos-list.component';
import { LoginComponent} from './components/login/login.component';
import { NoAutenticadoGuard } from './guards/no-autenticado/no-autenticado.guard';
import {EventoAddComponent} from './components/evento-add/evento-add.component';
import {EventoUpdateComponent} from './components/evento-update/evento-update.component';
import {EventoDeleteComponent} from './components/evento-delete/evento-delete.component';
import {EventoDetalleComponent} from './components/evento-detalle/evento-detalle.component';
import {AutenticacionGuard} from './guards/autenticacion/autenticacion.guard';
import {RegistroComponent} from './components/registro/registro.component';


const routes: Routes = [
  {
    path: 'eventos',
    component: EventosListComponent
  },
  {
    path: '',
    component: LoginComponent,
    canActivate: [NoAutenticadoGuard]
  },
  {
    path: 'nuevoEvento',
    component: EventoAddComponent,
    canActivate: [AutenticacionGuard]
  },
  {
    path: 'updateEvento',
    component: EventoUpdateComponent,
    canActivate: [AutenticacionGuard]
  },
  {
    path: 'deleteEvento',
    component: EventoDeleteComponent,
    canActivate: [AutenticacionGuard]
  },
  {
    path: 'evento/:idEvento/:edit',
    component: EventoDetalleComponent,
    canActivate: [AutenticacionGuard]
  },
  {
    path: 'registro',
    component: RegistroComponent,
    canActivate: [NoAutenticadoGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule {}
