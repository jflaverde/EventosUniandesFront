import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Location} from '@angular/common';
import {EventoListService} from '../../services/evento/evento-list/evento-list.service';
import {Evento} from '../../services/evento/evento';
import {DeleteEventoService} from '../../services/evento/evento-delete/evento-delete.service';

@Component({
  selector: 'app-eventos-list',
  templateUrl: './eventos-list.component.html',
  styleUrls: ['./eventos-list.component.css']
})
export class EventosListComponent implements OnInit {


  eventos: Evento[];

  @ViewChild('modalFase', {static: true}) modal: ElementRef;

  constructor(
    private activeModal: NgbModal,
    private location: Location,
    private eventoListService: EventoListService,
    private deleteEventoService:DeleteEventoService,
  ) {

  }

  ngOnInit() {
    this.getEventos();
  }


  getEventos(): void {
      this.eventoListService.getEventos()
        .subscribe(eventos => this.eventos = eventos);
  }

  eliminarEvento(idEvento): void {
  console.log('Evento: ' + idEvento);
  this.deleteEventoService.eliminar(idEvento).subscribe(
    result => {
     // Handle result
     console.log('Eliminar evento: ', result)
   },error => {
    console.log('Error eliminar evento: ', error);
  });
  let win = (window as any);
    if(win.location.search !== '?loaded' ) {
        win.location.search = '?loaded';
        win.location.reload();
    }
  }

    openModal(idEvento){
    var eliminar = confirm('Se elimanara el evento ' + idEvento + ' Continuar?' );
    if(eliminar){
      this.eliminarEvento(idEvento);
    }
  }

}
