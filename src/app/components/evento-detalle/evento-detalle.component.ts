import { Component, OnInit } from '@angular/core';
import {EventoUpdateService} from '../../services/evento/evento-update/evento-update.service';
import { Evento} from '../../services/evento/evento';
import {ActivatedRoute} from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriaService } from '../../services/categoria/categoria.service';
import { Categoria } from '../../services/categoria/categoria.model';
import {Location} from '@angular/common';
import { Router } from '@angular/router';
import {EventoListService} from '../../services/evento/evento-list/evento-list.service';

@Component({
  selector: 'app-detalle-evento',
  templateUrl: './evento-detalle.component.html',
  styleUrls: ['./evento-detalle.component.css']
})
export class EventoDetalleComponent implements OnInit {

  idEvento: number;
  evento: Evento;
  registerForm: FormGroup;
  categorias: Categoria[];
  edit: boolean;

  constructor(
    private location: Location,
    private eventoService: EventoUpdateService,
    private eventoListService: EventoListService,
    private route: ActivatedRoute,
    private categoriaService: CategoriaService,
    private router: Router
  ) { }

  ngOnInit() {
    this.idEvento = this.route.snapshot.params.idEvento;
    this.edit = this.route.snapshot.params.edit === 'true';
    console.log(typeof(this.edit));
    this.getDetalleEvento();
    this.getCategorias();
    console.log('evento: ', this.evento);
    this.registerForm = new FormGroup({
      nombre: new FormControl({value: this.evento.nombre, disabled: this.edit}, Validators.required),
      categoria: new FormControl({value: this.evento.categoria, disabled: this.edit}, Validators.required),
      lugar: new FormControl({value: this.evento.lugar, disabled: this.edit}, Validators.required),
      direccion: new FormControl({value:  this.evento.direccion, disabled: this.edit}, Validators.required),
      fechaInicio: new FormControl({value: this.evento.fechaInicio, disabled: this.edit}, Validators.required),
      fechaFin:  new FormControl({value:  this.evento.fechaFin, disabled: this.edit}, Validators.required),
      presencial:  new FormControl({value: this.evento.presencial ?  'True' : 'False', disabled: this.edit}, Validators.required),
    });
  }

  goBack(): void {
      this.location.back();
  }

  getCategorias(): void {
    this.categoriaService.getCategorias()
      .subscribe(categorias => this.categorias = categorias);
  }

  getDetalleEvento(): void {
    this.eventoListService
      .getDetalleEvento(this.idEvento)
      .subscribe(evento => (this.evento = evento));
  }

  editar() {
    const nombre = this.registerForm.get('nombre').value == ''? this.evento.nombre: this.registerForm.get('nombre').value;
    const categoria = this.registerForm.get('categoria').value == ''?this.evento.categoria: this.registerForm.get('categoria').value;
    const lugar = this.registerForm.get('lugar').value == ''?this.evento.lugar: this.registerForm.get('lugar').value;
    const direccion = this.registerForm.get('direccion').value == ''?this.evento.direccion: this.registerForm.get('direccion').value;
    const fechaInicio = this.registerForm.get('fechaInicio').value == ''?this.evento.fechaInicio: this.registerForm.get('fechaInicio').value;
    const fechaFin = this.registerForm.get('fechaFin').value == ''? this.evento.fechaFin: this.registerForm.get('fechaFin').value;
    const presencial = this.registerForm.get('presencial').value == ''? this.evento.presencial: this.registerForm.get('presencial').value;
    const user = '1';
    const evento = {'nombre': nombre, 'categoria':categoria, 'lugar':lugar,
      'direccion':direccion, 'fecha_inicio':fechaInicio,  'fecha_fin':fechaFin, 'presencial' : presencial, 'user': user };
    this.eventoService.editar(evento, this.idEvento).subscribe(response => {
      this.router.navigate(['/eventos']);
        }, error => {
          console.log(error);
          alert('Formulario Invalido');
          this.registerForm.reset();
        });

  };
}
