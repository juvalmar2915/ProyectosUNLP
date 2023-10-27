import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../modelos/producto-service';
import { Producto } from '../modelos/producto';
import { Router } from '@angular/router';
import { PedidoService } from '../modelos/pedido-service';
import { UsuarioService } from '../modelos/usuario-service';
import { RondaService } from '../modelos/ronda-service';
import { Visitante } from '../modelos/visitante';
import { Ronda } from '../modelos/ronda';
import { Categoria } from '../modelos/categoria';
import { CategoriaService } from '../modelos/categoria-service';
import { LoginService } from '../modelos/login.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit{
  productos: any [];
  buscar: string;
  lista:Categoria[]=[];
  visitante: any;
  seleccionado:Categoria;
  priceFilter: string = '';
  pedido:any;
  prohibidoagregar:boolean;
  rondas: any[];
  errorMessage: string;
  idCliente:any;
  rol:any;
  isLogged:any;

  constructor(private categoriaservice:CategoriaService,private productoservice: ProductoService, private router: Router, private pedidoservice: PedidoService,private visitanteservice:UsuarioService,private rondaservice:RondaService,private loginService:LoginService) {
    this.productos = [];
    this.rondas=[];
    this.buscar='';
    this.seleccionado=new Categoria(-1,false,'');
    this.errorMessage='';
    this.prohibidoagregar=false;
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


  public agregarProductoalcarrito (producto: Producto){  
    if(this.isLogged){
      this.visitanteservice.getVisitante(this.idCliente).subscribe(
        data => { 
          console.log(data);
          this.visitante=  data as Visitante;
          const pedidonuevo = {
            id: -1,
            borrado: false,
            estado:"",
            tipoEntrega: "",
            total: producto.precio,
            fecha: new Date(),
            visitante: this.visitante,
            ronda: this.rondas[this.rondas.length - 1],
            productos: [producto],
          };
          this.pedidoservice.addPedido(pedidonuevo).subscribe(
            data => { 
            console.log(data);
            this.router.navigate(['/Carrito']);
            },
            error => {
              if (error.status === 409) {
                  const pedidoeditado = {
                    id: -1,
                    borrado: false,
                    estado:"",
                    tipoEntrega: "",
                    total: producto.precio,
                    fecha: new Date(),
                    visitante: this.visitante,
                    ronda: this.rondas[this.rondas.length - 1],
                    productos: [producto],
                  }
                  this.pedidoservice.editPedido1(pedidoeditado).subscribe(
                    data => { 
                      console.log(data);
                      this.router.navigate(['/Carrito']);
                    }
                  )
              } else {
                this.errorMessage = 'Ha ocurrido un error. Por favor, inténtelo nuevamente.';
              }
            }
          );
          });
        }
  }
  realizarBusqueda() {
    this.onSearch(this.buscar);
  }
  onSelect(selectedValue: Categoria) {
    console.log('Opción seleccionada:', selectedValue);
    if (selectedValue != null){
    this.productoservice.getproductosbycategoria(selectedValue.id).subscribe(
      prod => { 
      console.log(prod);
      this.productos=  prod.filter((producto) => ((!producto.borrado) && (producto.stock>0)) );
      });
    }
    else{
      this.productoservice.getproductos().subscribe(
        prod => { 
          console.log(prod);
          this.productos=  prod.filter((producto) => ((!producto.borrado) && (producto.stock>0)) );
        }
      )
    }
  }

  filterProductsByPrice() {
    if (this.priceFilter === 'mayor') {
      this.productos.sort((a, b) => Number(b.precio) - Number(a.precio));
      
    }
    if (this.priceFilter === 'menor') {
      this.productos.sort((a, b) => Number(a.precio) - Number(b.precio));
    } 
    this.productos=this.productos;
  }

  onSearch(searchTerm: string) {
    console.log('Término de búsqueda:', searchTerm);
    this.productoservice.getproductos().subscribe(
      prod => { 
      this.productos=  prod.filter((producto) => ((producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())) && (producto.stock>0)));
      });
  }

  loadComponent() {
    this.categoriaservice.getCategorias().subscribe(
      cat => {
        this.lista=cat as Categoria[];
        this.productoservice.getproductos().subscribe(
          data => { 
          console.log(data);
          this.productos=  data.filter((producto) => (!producto.borrado) && (producto.stock>0));
          this.rondaservice.getrondas().subscribe(data => { 
            console.log(data);
            this.rondas=  data as Ronda[];
              this.pedidoservice.getpedidosbyuser(this.idCliente).subscribe(
                algo =>{
                  if (algo.length>0){
                    this.pedido=algo[algo.length-1];
                    if (((this.pedido.estado=="Confirmado") || (this.pedido.estado=="Entregado")) && (this.rondas[this.rondas.length-1].nroRonda==this.pedido.ronda.nroRonda)){
                        this.prohibidoagregar=true;
                    }
                  }
                  else{
                    this.prohibidoagregar=false;
                  }
                }
              )
          });
          });
      }
    )
  }
}