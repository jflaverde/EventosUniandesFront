import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { DatosUsuario } from '../../models/datos-usuario';
import * as crypto from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  obtenerToken() {
    const token = localStorage.getItem('token');
    if (token === null) {
      //this.borrarDatos();
    }
    return token;
  }

  login(username, password) {
    return new Promise((resolve, reject) => {
      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
      this.httpClient
        .post(
          environment.apiUrl + 'login/',
          {
            username,
            password
          },
          options
        )
        .subscribe(
          data => {
            resolve(data);
          },
          err => {
            reject(err.error.error);
          }
        );
    });
  }

  registro(usuario): Observable<any> {
    const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
    return this.httpClient.post(environment.apiUrl + 'users/add/', usuario, options).pipe(map(response => { }));
  }

  guardarDatos(data, email) {
    const token = data.token;
    console.log("Entro guardar datos login")
    localStorage.setItem('token', token);
    delete data.token;
    data.email = email;

    console.log(data);

    localStorage.setItem(
      'TOKEN',
      crypto.AES.encrypt(JSON.stringify(data), token).toString()
    );
  }

  autenticado(): boolean {
    console.log(localStorage.getItem('token'));
    return localStorage.getItem('token') !== null;
  }

  obtenerDatosUsuario(): DatosUsuario {

    let datosUsuario = null;
    const token = this.obtenerToken();
    const usuarioTexto = localStorage.getItem('TOKEN');
    if (usuarioTexto === null) {
      //this.borrarDatos();
      //window.location.reload();
    } else {
      try {
        const usuario = JSON.parse(
          crypto.AES.decrypt(usuarioTexto, token).toString(crypto.enc.Utf8)
        );

        datosUsuario = {
          nombre: usuario.firstName,
          apellido: usuario.lastName,
          id: usuario.id,
          email: usuario.email,
          numeroIdentificacion: usuario.numeroIdentificacion
        };
      } catch (err) {
        //this.borrarDatos();
        //window.location.reload();
      }
    }
    return datosUsuario;
  }

  cerrarSesion() {
    return new Promise((resolve, reject) => {
      const tokenSisred = this.obtenerToken();
      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Token ' + tokenSisred
        })
      };
      this.httpClient.get(environment.apiUrl + 'logout/', options).subscribe(
        data => {
          resolve(data);
        },
        err => {
          console.log(err);
          reject(err);
        }
      );
    });
  }

  borrarDatos() {
    localStorage.clear();
    window.location.reload();
  }
}
