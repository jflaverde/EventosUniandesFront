import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Evento} from '../evento';
import {AutenticacionService} from '../../autenticacion/autenticacion.service';
import {DatosUsuario} from '../../../models/datos-usuario';
import {Router} from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class AgregarEventoService{
  private eventos: Array<Evento> = [];
  private evento: Evento = new Evento();
  private usuario: DatosUsuario;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private autenticacionService: AutenticacionService
  ) {}

  register(evento): Observable<any> {
    const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      };
    console.log('Evento: ' + evento);
    return this.httpClient.post(environment.apiUrl + 'evento_create/', evento, options).pipe(map(response => { }));
  }

}
