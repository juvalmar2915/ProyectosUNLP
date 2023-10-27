import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../modelos/admin-service';
import { UsuarioService } from '../modelos/usuario-service';
import { Visitante } from '../modelos/visitante';
import { LoginService } from '../modelos/login.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  
  constructor(private loginService:LoginService, private usuarioService:UsuarioService, private adminService: AdminService, private router: Router) {}

  public errorMessage: string = '';
  model = new Visitante(1,false,'', '', '', '');
  submitted = false;
  onSubmit() { 
    this.loginService.login(this.model)
    .subscribe(
      data => { 
      console.log(data);
      this.loginService.establecerSesion(data.token, data.rol, data.id);
      this.submitted = true;
      this.router.navigate(['/Catalogo']);
      },
      error => {
        if (error.status == 409) {
          console.error('Email ya se encuentra en la base de datos', error.error);
        }else if (error.status === 404) {
          this.errorMessage = 'El email no se encuentra en la base de datos';
        } else if (error.status === 401){
          this.errorMessage = 'Contraseña incorrecta';
        } else{
          this.errorMessage = 'Ha ocurrido un error. Por favor, inténtelo nuevamente.';
        }
      }
    );
  }

}