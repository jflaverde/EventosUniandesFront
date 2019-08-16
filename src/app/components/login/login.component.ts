import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AutenticacionService } from '../../services/autenticacion/autenticacion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  registerForm: FormGroup;
  public enviado = false;

  constructor(
    private autenticacionService: AutenticacionService,
  ) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  login() {
    const email = this.registerForm.get('email').value;
    const password = this.registerForm.get('password').value;
    if (email !== '' && password !== '') {
      this.autenticacionService
        .login(email, password)
        .then(data => {
          this.autenticacionService.guardarDatos(data, email);
          window.location.reload();
        })
        .catch(err => {
          alert(err);
          console.log(err);
        });
    }else{
      alert("Por favor ingrese el correo y la contraseña.")
    }
  }

}
