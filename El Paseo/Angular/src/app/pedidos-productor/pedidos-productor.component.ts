import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../modelos/pedido-service';
import { Router } from '@angular/router';
import { RondaService } from '../modelos/ronda-service';
import { UsuarioService } from '../modelos/usuario-service';
import { Productor } from '../modelos/productor';
import { ProductoService } from '../modelos/producto-service';
import { ProductorService } from '../modelos/productor-service';
import { Pedido } from '../modelos/pedido';

@Component({
  selector: 'app-pedidos-productor',
  templateUrl: './pedidos-productor.component.html',
  styleUrls: ['./pedidos-productor.component.css']
})
export class PedidosProductorComponent implements OnInit{
  productos: any [];
  productores:Productor[]=[];
  visitante: any;
  mensaje:string;
  dataloaded:boolean;
  seleccionado:Productor;
  seleccionado2:string;
  pedidos:Pedido[];
  peds:any[]=[];
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
    this.peds=[];
    console.log('Opción seleccionada:', selectedValue.nombre);
    this.pedidoservice.getpedidos().subscribe(
      data => { 
        this.pedidos=data.filter((ped) => ((!ped.borrado) && (ped.ronda.nroRonda==this.rondas[this.rondas.length-1].nroRonda) && (ped.estado=='Confirmado') && ped.productos.some((producto) => {
          return producto.productor.id === selectedValue.id;
        })) )
        for (let i = 0; i < this.pedidos.length; i++) {
          this.pedidos[i].productos=this.pedidos[i].productos.filter((prod) => (prod.productor.id === selectedValue.id));
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
          this.peds[i]=this.pedidos[i];
          this.peds[i].productos=productosFormateados;
        }
      })
  }
  onSelect2(selectedValue2: string) {
    this.peds=[];
    this.pedidoservice.getpedidos().subscribe(
      data => { 
        this.pedidos=data.filter((ped) => ((!ped.borrado) && (ped.ronda.nroRonda==this.rondas[this.rondas.length-1].nroRonda) && (ped.estado=='Confirmado') ) ) 
        // con los productos juntar cantidad
        if (selectedValue2 === 'Retiro') {
          this.pedidos=this.pedidos.filter((zona) => (zona.tipoEntrega ==='Retiro'));
          console.log(this.pedidos);
        }
        if (selectedValue2 === 'Entrega') {
          this.pedidos=this.pedidos.filter((zona) => (zona.tipoEntrega.includes('Envio')));
          console.log(this.pedidos);
        }
        for (let i = 0; i < this.pedidos.length; i++){
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
          this.peds[i]=this.pedidos[i];
          this.peds[i].productos=productosFormateados;
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
              this.pedidos=data.filter((ped) => ((!ped.borrado) && (ped.ronda.nroRonda==this.rondas[this.rondas.length-1].nroRonda) && (ped.estado=='Confirmado') ))
              this.productorservice.getproductores().subscribe(
                prod =>{
                  this.productores=prod.filter((p) => ((!p.borrado)))
                  for (let i = 0; i < this.pedidos.length; i++){
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
                    this.peds[i]=this.pedidos[i];
                    this.peds[i].productos=productosFormateados;
                  }
                  if (this.peds.length==0){
                    this.mensaje="No hay pedidos que mostrar";
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
