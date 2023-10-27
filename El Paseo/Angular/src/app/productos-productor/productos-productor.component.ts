import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../modelos/pedido-service';
import { Router } from '@angular/router';
import { RondaService } from '../modelos/ronda-service';
import { UsuarioService } from '../modelos/usuario-service';
import { Productor } from '../modelos/productor';
import { ProductoService } from '../modelos/producto-service';
import { ProductorService } from '../modelos/productor-service';
import { Pedido } from '../modelos/pedido';
import { Producto } from '../modelos/producto';

@Component({
  selector: 'app-productos-productor',
  templateUrl: './productos-productor.component.html',
  styleUrls: ['./productos-productor.component.css']
})
export class ProductosProductorComponent {
  productos: any []=[];
  productores:Productor[]=[];
  visitante: any;
  dataloaded:boolean;
  seleccionado:Productor;
  seleccionado2:string;
  mensaje:string;
  pedidos:Pedido[];
  rondas: any[];
  ronda: any;
  ngOnInit(): void {
    this.loadComponent();
  }
  constructor(private router: Router, private pedidoservice: PedidoService,private productorservice:ProductorService,private rondaservice:RondaService) {
    this.productos = [];
    this.rondas=[];
    this.seleccionado=new Productor(-1,false,'','','');
    this.seleccionado2='';
    this.pedidos=[];
    this.mensaje='';
    this.dataloaded=false;
  }
  onSelect(selectedValue: Productor) {
    this.mensaje='';
    this.productos=[];
    console.log('Opción seleccionada:', selectedValue.nombre);
    this.pedidoservice.getpedidos().subscribe(
      data => { 
        this.pedidos=data.filter((ped) => ((!ped.borrado) && (ped.ronda.nroRonda==this.rondas[this.rondas.length-1].nroRonda) && (ped.estado=='Entregado') && ped.productos.some((producto) => {
          return producto.productor.id === selectedValue.id;
        })) )
        for (let i = 0; i < this.pedidos.length; i++) {
          this.pedidos[i].productos=this.pedidos[i].productos.filter((prod) => (prod.productor.id === selectedValue.id))
          for (let x = 0; x < this.pedidos[i].productos.length; x++) {
            const productX = this.pedidos[i].productos[x];
            const productoXIndex = this.productos.findIndex((producto) => producto.id === productX.id);
            const productox = {
              id: productX.id,
              borrado: productX.borrado,
              foto: productX.foto,
              precio: productX.precio,
              total: 0,
              cantidad: 1,
              nombre: productX.nombre,
              stock: productX.stock,
              categoria: productX.categoria,
              descripcion: productX.descripcion,
              productor: productX.productor
            }
            if (productoXIndex !== -1) {
              this.productos[productoXIndex].cantidad = this.productos[productoXIndex].cantidad +1;
            }
            else{
              this.productos[this.productos.length] = productox;
            }
                      
          }
          
        }
        for (let y = 0; y < this.productos.length; y++) {
          this.productos[y].total= this.productos[y].cantidad *this.productos[y].precio;
        }
        if (this.productos.length==0){
          this.mensaje="No hay nada que ver";
        }
      })
  }

  loadComponent() {
    this.rondaservice.getrondas().subscribe(
      r => { 
        this.rondas=r;
        this.ronda=this.rondas[this.rondas.length-1];
        if(this.rondas.length>0){
          this.pedidoservice.getpedidos().subscribe(
            data => { 
              this.pedidos=data.filter((ped) => ((!ped.borrado) && (ped.ronda.nroRonda==this.rondas[this.rondas.length-1].nroRonda) && (ped.estado=='Entregado') ))
              this.productorservice.getproductores().subscribe(
                prod =>{
                  this.productores=prod.filter((p) => ((!p.borrado)))
                  if (this.productores.length > 0) {
                    this.seleccionado = this.productores[0]; // Establecer el primer productor como seleccionado
                    this.onSelect(this.seleccionado); // Llamar a la función en el constructor
                  }
                  this.dataloaded=true;
                }
              )
            });
        }
        else{
          this.dataloaded=false;
        }
      });
    
  }
    

}


