import { Component, OnInit } from '@angular/core';
import { Direccion } from '../modelos/direccion';
import { Router } from '@angular/router';
import { DireccionService } from '../modelos/direccion-service';
import { LoginService } from '../modelos/login.service';
import { UsuarioService } from '../modelos/usuario-service';
import { Visitante } from '../modelos/visitante';

@Component({
  selector: 'app-direcciones-form',
  templateUrl: './direcciones-form.component.html',
  styleUrls: ['./direcciones-form.component.css']
})
export class DireccionesFormComponent implements OnInit{
  isLogged: boolean = false;
  rol = "loguear";
  idCliente:any;
  direccion:Direccion;
  submitted:boolean;

  constructor(private router: Router,private direccionservice:DireccionService, private loginService:LoginService, private userService:UsuarioService) {
    this.submitted=false;
    this.direccion=new Direccion(-1,false,'',-1,-1,'');
  }

  ngOnInit(): void {
    this.loginService.obtenerDatosDeSesion().subscribe(
      (datos)=>{
        console.log(datos);
        this.isLogged = datos.logged;
        this.rol = datos.rol;
        this.idCliente = datos.id;
        this.loadComponent();
      },
      (error)=>{
      }
    );
  }

  onSubmit() { 
    //se debe poner el usuario de las cookies

    this.direccionservice.addDireccion(this.direccion).subscribe(
      algo => {
        this.direccion = algo as Direccion;
        this.submitted = true;
        this.router.navigate(['/EditarPerfil']);
      },
  )
  }

  loadComponent(){
    if(this.isLogged){
      this.userService.getVisitante(this.idCliente).subscribe(
        data =>{
          this.direccion.v = data as Visitante;
        }
      )
    }
  }
}
