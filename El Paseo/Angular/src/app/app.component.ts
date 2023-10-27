import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from "ngx-cookie-service";
import { LoginService } from './modelos/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private loginService: LoginService, private router: Router, private cookies: CookieService) { }

  rol: any;
  id: any;
  isLogged: any;
  token: any;
  logo = 'assets/img/Logo-transparente.png'

  ngOnInit(): void{
    this.actualizarSesion();
    this.loginService.obtenerDatosDeSesion().subscribe(
      (datos)=>{
        console.log(datos);
        this.isLogged = datos.logged;
        this.rol = datos.rol;
        this.id = datos.id;
      },
      (error)=>{
      }
    )  
  } 

  actualizarSesion(){
    if(this.loginService.activa()){
      this.token = this.loginService.getToken();
      this.id = this.loginService.getId();
      this.rol = this.loginService.getRol();
    }
  }
  
}