import { Component, OnDestroy, OnInit } from '@angular/core';
import { Pedido } from '../modelos/pedido';
import { PedidoService } from '../modelos/pedido-service';
import { UsuarioService } from '../modelos/usuario-service';
import { Visitante } from '../modelos/visitante';
import { LoginService } from '../modelos/login.service';
import { RondaService } from '../modelos/ronda-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy{

  constructor(private pedidoservice:PedidoService, private usuarioService:UsuarioService, private loginService:LoginService, private rondaService:RondaService){
    this.displaydata=false;
    this.pedidoconfirmado=false;
  }

  pedido:any;
  visitante:any
  pedidoconfirmado:boolean
  displaydata:boolean
  logo = "assets/img/Logo.JPG";
  isLogged: boolean = false;
  rol = "loguear";
  id:any;

  //suscripcion: Subscription = new Subscription();

  ngOnInit(): void {
    this.loginService.obtenerDatosDeSesion().subscribe(
      (datos)=>{
        console.log(datos);
        this.isLogged = datos.logged;
        this.rol = datos.rol;
        this.id = datos.id;
        this.loadcomponent();
      },
      (error)=>{
      }
    );
  }
  ngOnDestroy(): void {
    
  }

  loadcomponent(){
    if(this.isLogged){
    this.pedidoservice.getpedidosbyuser(this.id).subscribe(
      data => { 
        console.log(data);
        if (data.length>0){
        this.pedido=  data[data.length-1] as Pedido;
        this.usuarioService.getVisitante(this.id).subscribe(
          data2 => { 
            console.log(data2);
            this.visitante=  data2 as Visitante;
            this.displaydata=true;
            if (this.pedido.estado=='Confirmado' || this.pedido.estado=='Entregado'){
              this.pedidoconfirmado=true;
            }
          }
        );
        }
        else{
          this.pedidoconfirmado=false;
        }
      }
    );
    }
  }

  cerrarSesion(){
    this.loginService.cerrarSesion();
  }
  
}
