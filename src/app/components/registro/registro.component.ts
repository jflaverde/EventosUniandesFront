import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AutenticacionService } from '../../services/autenticacion/autenticacion.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private location: Location,
    private router: Router,
    private autenticacionService: AutenticacionService,
  ) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      password2: new FormControl('', Validators.required),
    });
  }

  goBack(): void {
      this.location.back();
  }

  registro() {
    const email = this.registerForm.get('email').value;
    const password = this.registerForm.get('password').value;
    const nombre = this.registerForm.get('nombre').value;
    const apellido = this.registerForm.get('apellido').value;
    const password2 = this.registerForm.get('password2').value;
    if(password == password2){
    const usuario = {'username': email, 'password':password, 'first_name':nombre, 'last_name':apellido };
    console.log('usuario: ', usuario);
    this.autenticacionService.registro(usuario).subscribe(response => {
      this.router.navigate(['/']);
        }, error => {
          console.log(error);
          alert(error.error);
          //this.registerForm.reset();
        });
      }else{
        alert('La contraseña y la confirmación de la contraseña no son iguales.');
      }

  };

}
