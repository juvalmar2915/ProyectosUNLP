import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../modelos/pedido-service';
import { Pedido } from '../modelos/pedido';
import { NavbarComponent } from '../navbar/navbar.component';
import { RondaService } from '../modelos/ronda-service';
import { Router } from '@angular/router';
import { LoginService } from '../modelos/login.service';

@Component({
  selector: 'app-usuariopedidos',
  templateUrl: './usuariopedidos.component.html',
  styleUrls: ['./usuariopedidos.component.css']
})
export class UsuariopedidosComponent implements OnInit{
  pedidos: any [];
  pedido: any;
  dataLoaded: boolean = false;
  idCliente:any;
  rol:any;
  isLogged:any;

  constructor(private pedidoService: PedidoService,private rondaservice: RondaService,private router: Router, private loginService:LoginService) {
    this.pedidos = [];
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

  public modificarPedido (pedido: any){
    this.pedidoService.modificarPedido(pedido).subscribe();
    this.loadComponent();
    location.reload();
  }
  public cancelarPedido (id: any){
    this.pedidoService.deletePedido(id);
    this.loadComponent();
    location.reload();
  }
  public RepetirPedido (pedido: any){
    this.rondaservice.getrondas().subscribe(
      data =>{
        pedido.ronda=data[data.length-1];
        pedido.fecha=new Date();
        this.pedidoService.addPedido(pedido).subscribe(
          p =>{
            console.log(p);
            this.router.navigate(['/Carrito']);
          },
          err =>{
                this.pedidoService.RepetirPedido(pedido).subscribe(
                  d => { 
                    console.log(d);
                    this.router.navigate(['/Carrito']);
                  }
                )
          }
        );
      }
    )
  }
  loadComponent() {
    if(this.isLogged){
    this.pedidoService.getpedidosbyuser(this.idCliente).subscribe(
      data => { 
      console.log(data);
      this.pedidos=  data as Pedido[];
      for (let i = 0; i < this.pedidos.length; i++) {
        const productosFormateados = this.pedidos[i].productos.reduce((lista: any[], producto: any) => {
          const existe = lista.find((p: any) => p.id === producto.id);
          if (!existe) {
            const cantidad = this.pedidos[i].productos.filter((p: any) => p.id === producto.id).length;
            lista.push({
              id: producto.id,
              borrado: producto.borrado,
              precio: producto.precio,
              foto: producto.foto,
              descripcion: producto.descripcion,
              nombre: producto.nombre,
              stock: producto.stock,
              productor: producto.productor,
              categoria: producto.categoria,
              cantidad: cantidad,
            });
          }
          return lista;
        }, []);
        this.pedidos[i].productos=productosFormateados;
      }
      this.dataLoaded=true;
      });
  }
}
}