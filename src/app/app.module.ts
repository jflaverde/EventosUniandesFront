import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {EventosListComponent} from './components/eventos-list/eventos-list.component';
import {EventoAddComponent} from './components/evento-add/evento-add.component';
import {EventoUpdateComponent} from './components/evento-update/evento-update.component';
import {EventoDeleteComponent} from './components/evento-delete/evento-delete.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EventoDetalleComponent } from './components/evento-detalle/evento-detalle.component';
import {RegistroComponent} from './components/registro/registro.component';


@NgModule({
  declarations: [
    AppComponent,
    EventoAddComponent,
    EventosListComponent,
    LoginComponent,
    EventoDetalleComponent,
    EventoUpdateComponent,
    EventoDeleteComponent,
    RegistroComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
