import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../modelos/producto-service';
import { Router } from '@angular/router';
import { PedidoService } from '../modelos/pedido-service';
import { RondaService } from '../modelos/ronda-service';
import { Pedido } from '../modelos/pedido';
import { Ronda } from '../modelos/ronda';
import { Direccion } from '../modelos/direccion';
import { DireccionService } from '../modelos/direccion-service';
import { PuntoRetiroService } from '../modelos/punto-retiro-service';
import { Punto_Retiro } from '../modelos/punto-retiro';
import { LoginService } from '../modelos/login.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit{
  nohaycosas:boolean;
  productos: any[];
  prodaeliminar: any;
  direccionCheckbox:boolean;
  retiroCheckbox:boolean;
  dataloaded: boolean;
  pedido: any;
  visitante: any;
  mensaje:string;
  rondas: any[];
  direcciones: any[];
  puntoretiros: Punto_Retiro[];
  selectedPuntoRetiro:any;
  selectedDireccion:any;
  selectedHorario: any;
  horarios: string[] = ['11:30-12:30', '12:30-13:30', '13:30-14:30', '14:30-15:30'];
  submitted = false;
  idCliente:any;
  rol:any;
  isLogged:any;

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

  constructor(private productoservice: ProductoService, private router: Router, private pedidoservice: PedidoService,private direccionservice: DireccionService,private rondaservice:RondaService, private puntoservice: PuntoRetiroService, private loginService:LoginService) {
    this.productos = [];
    this.pedido= {};
    this.dataloaded =false;
    this.rondas= [];
    this.mensaje="";
    this.direccionCheckbox=false;
    this.retiroCheckbox=false;
    this.direcciones=[];
    this.puntoretiros=[];
    this.nohaycosas=false;

  }
  public mostrardirec(){
    this.direccionCheckbox= !this.direccionCheckbox;
    this.retiroCheckbox= false;
  }
  public mostrarpuntoRet(){
    this.retiroCheckbox= !this.retiroCheckbox;
    this.direccionCheckbox =false;
  }

  public eliminarproductodelcarrito(id: number){
    this.prodaeliminar=this.productos.filter(p => p.id == id);
    const pedidoaeditar = {
      id: this.pedido.id,
      borrado: this.pedido.borrado,
      estado: this.pedido.estado,
      tipoEntrega: this.pedido.estado,
      total: this.prodaeliminar[0].precio*this.prodaeliminar[0].cantidad,
      fecha: new Date(),
      visitante: this.pedido.visitante,
      ronda: this.rondas[this.rondas.length - 1],
      productos: this.pedido.productos.filter((a: { id: number }) => a.id == id),
    }
    console.log(pedidoaeditar.productos);
    this.pedidoservice.editPedido2(pedidoaeditar).subscribe(data => { 
      console.log(data);
      this.loadComponent();
      location.reload();
    });
  }

  public vaciarcarrito(){
    this.pedidoservice.vaciarPedido(this.pedido).subscribe(data => { 
      console.log(data);
      this.loadComponent();
      location.reload();
    });
  }
  onSubmit() { 
    if (this.direccionCheckbox){
      this.pedido.tipoEntrega='Envio: '+this.selectedHorario;
      this.pedido.puntoRetiro=null;
      this.pedido.direccion=this.selectedDireccion as Direccion;
      this.pedidoservice.confirmarpedido(this.pedido)
      .subscribe(
        data => { 
        console.log(data);
        this.pedidoservice.agregarPedido(this.pedido);
        this.submitted = true;
        this.router.navigate(['/Pedidos']);
        }
      );
    }
    else{
      if (this.retiroCheckbox){
        this.pedido.tipoEntrega='Retiro';
        this.pedido.direccion=null;
        this.pedido.puntoRetiro=this.selectedPuntoRetiro as Punto_Retiro;
        this.pedidoservice.confirmarpedido(this.pedido)
        .subscribe(
          data => { 
          console.log(data);
          this.pedidoservice.agregarPedido(this.pedido);
          this.submitted = true;
          this.router.navigate(['/Pedidos']);
          }
    );
      }
      else{
        this.mensaje="Seleccione un metodo de envio"
      }
    }
    
    
  }

  loadComponent() {
    if(this.isLogged){
      this.puntoservice.getPuntosRetiro().subscribe(
        pr => { 
          console.log(pr);
          this.puntoretiros=pr.filter((prs  => (!prs.borrado)));
      });
      this.direccionservice.getdireccionesdeusuario(this.idCliente).subscribe(
        dires => { 
          console.log(dires);
          this.direcciones=dires as Direccion[];
          this.direcciones=this.direcciones.filter((drs  => (!drs.borrado)));
      }
      );
      this.rondaservice.getrondas().subscribe(rond => { 
        console.log(rond);
        this.rondas=  rond as Ronda[];
      this.pedidoservice.getpedidosbyuser(this.idCliente).subscribe(
        data => { 
          console.log(data);
          this.pedido=  data[data.length-1] as Pedido;
          if (this.pedido.ronda.nroRonda == this.rondas[this.rondas.length-1].nroRonda){
            const productosFormateados = this.pedido.productos.reduce((lista: any[], producto: any) => {
              const existe = lista.find((p: any) => p.id === producto.id);
              if (!existe) {
                const cantidad = this.pedido.productos.filter((p: any) => p.id === producto.id).length;
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
            this.productos=productosFormateados;
            this.productoservice.getproductos().subscribe(
              prodfoto => { 
                for (let x = 0; x < this.productos.length; x++){
                  for (let i = 0; i < prodfoto.length; i++) {
                    if(this.productos[x].id== prodfoto[i].id){
                      this.productos[x].foto=prodfoto[i].foto;
                      break;
                    }
                  }
                }
              }
            )
            if (this.productos.length===0){
              this.pedido.total=0;
              this.nohaycosas=true;
              this.mensaje="Carrito vacio";
            }
          }
          else{
            this.pedido.total=0;
            this.mensaje="Carrito vacio";
          }
          this.dataloaded=true;
          }
      );
    });
    }
    }
}
