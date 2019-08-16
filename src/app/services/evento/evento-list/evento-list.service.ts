import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Evento} from '../evento';
import {AutenticacionService} from '../../autenticacion/autenticacion.service';
import {DatosUsuario} from '../../../models/datos-usuario';

@Injectable({
  providedIn: 'root'
})
export class EventoListService {

    private eventos: Array<Evento> = [];
    private usuario: DatosUsuario;
    private evento: Evento = new Evento();

    constructor(private httpClient: HttpClient, private autenticacionService: AutenticacionService) { }


    getEventos(): Observable<Evento[]> {
    const tokenSisred = this.autenticacionService.obtenerToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    this.usuario = this.autenticacionService.obtenerDatosUsuario();
    console.log('usuario: ', this.usuario.id);
    this.eventos = [];
    this.httpClient.get(environment.apiUrl + 'eventos/' + this.usuario.id + '/', {headers}).subscribe((data: Array<any>) => {
      console.log('eventos: ' + data);
      data.forEach(dataItem => {
        const evento = new Evento();
        evento.id = dataItem.id;
        evento.nombre = dataItem.nombre;
        evento.categoria = dataItem.categoria;
        evento.lugar = dataItem.lugar;
        this.eventos.push(evento);
      });
    });
    console.log('evento: ' + this.eventos)
    return of(this.eventos);
}

getDetalleEvento(idEvento: number): Observable<Evento> {
    const tokenSisred = this.autenticacionService.obtenerToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let params = new HttpParams();
    params = params.append('', idEvento.toString());
    console.log('idEvento: ' + idEvento);
    this.httpClient
      .get(environment.apiUrl + 'evento/' + idEvento, { headers })
      .subscribe((data: any) => {
        data.forEach(item => {
          this.evento.id = item.id;
          this.evento.nombre = item.nombre;
          this.evento.categoria = item.categoria;
          this.evento.lugar = item.lugar;
          this.evento.direccion = item.direccion;
          this.evento.fechaInicio = item.fecha_inicio;
          this.evento.fechaFin = item.fecha_fin;
          this.evento.presencial = item.presencial;
        })
        console.log('message', this.evento);
      });
    return of(this.evento);
  }

}
