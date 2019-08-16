import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Evento} from '../evento';
import {AutenticacionService} from '../../autenticacion/autenticacion.service';
import {DatosUsuario} from '../../../models/datos-usuario';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventoUpdateService {
  private eventos: Array<Evento> = [];
  private evento: Evento = new Evento();
  private usuario: DatosUsuario;

 constructor(
    private httpClient: HttpClient,
    private autenticacionService: AutenticacionService
  ) { }


  editar(evento, idEvento): Observable<any> {
  const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
  console.log('Evento: ' + evento);
  return this.httpClient.put(environment.apiUrl + 'updateEvento/' + idEvento, evento, options).pipe(map(response => { }));
}
}
