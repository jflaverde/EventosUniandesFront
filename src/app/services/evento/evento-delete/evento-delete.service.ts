import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import  {environment} from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DeleteEventoService{


  constructor(
    private httpClient: HttpClient
  ) { }

   eliminar(idEvento) {
    const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      };
    return this.httpClient.put(environment.apiUrl + 'evento_delete/' + idEvento, options).pipe(map(response => { }));
  }
}
