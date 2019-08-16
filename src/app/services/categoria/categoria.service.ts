import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Categoria } from '../../services/categoria/categoria.model';
import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';
import { AutenticacionService } from '../autenticacion/autenticacion.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private categorias: Array<Categoria> = [];

  constructor(
    private httpClient: HttpClient,
    private autenticacionService: AutenticacionService
  ) { }

  getCategorias(): Observable<Categoria[]> {
  const tokenSisred = this.autenticacionService.obtenerToken();

  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  this.categorias = [];
  this.httpClient.get(environment.apiUrl + 'categorias/', {headers}).subscribe((data: Array<any>) => {
    data.forEach(dataItem => {
      const categoria = new Categoria();
      categoria.id = dataItem.id;
      categoria.nombre = dataItem.nombre;
      this.categorias.push(categoria);
    });
  });
  console.log("categoria: " + this.categorias)
  return of(this.categorias);
}
}
