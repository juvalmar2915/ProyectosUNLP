import { Component } from '@angular/core';
import { PedidoService } from '../modelos/pedido-service';
import { Pedido } from '../modelos/pedido';
import { RondaService } from '../modelos/ronda-service';

@Component({
  selector: 'app-adminspedidos',
  templateUrl: './adminspedidos.component.html',
  styleUrls: ['./adminspedidos.component.css']
})
export class AdminspedidosComponent {
  pedidos: any [];
  mensaje: string;
  ronda: any;
  pedido: any;
  dataLoaded: boolean = false;
  ngOnInit(): void {
    this.loadComponent();
  }
  constructor(private pedidoService: PedidoService,private rondaService: RondaService) {
    this.pedidos = [];
    this.mensaje= '';
  }
  public entregarPedido (pedido: any){
    this.pedidoService.entregadoPedido(pedido).subscribe();
    this.loadComponent();
    location.reload();
  }
  loadComponent() {
    this.rondaService.getrondas().subscribe(
      r => { 
        this.ronda=r[r.length-1];
        console.log(this.ronda)
        this.pedidoService.getpedidos().subscribe(
          data => { 
          console.log(data);
          this.pedidos=  data.filter((ped: any) => ((ped.ronda.nroRonda === this.ronda.nroRonda) && (ped.estado === 'Confirmado')));
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
          if (this.pedidos.length==0){
            this.mensaje="No hay pedidos para entregar"
          }
          this.dataLoaded=true;
          });
      }
    )
  }
}
