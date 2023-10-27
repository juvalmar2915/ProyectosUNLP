import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../modelos/producto-service';
import { Categoria } from '../modelos/categoria';
import { CategoriaService } from '../modelos/categoria-service';
import { ImagenService } from '../modelos/imagen-service';
import { Producto } from '../modelos/producto';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit{
    lista:Categoria[]=[];
    foto:string[]=[];
    seleccionado:Categoria;
    productos: Producto [];
    dataLoaded: boolean = false;
    ngOnInit(): void {
      this.loadComponent();
    }


    constructor(private productoservice: ProductoService,private categoriaservice: CategoriaService, private imagenservice:ImagenService) {
      this.productos = [];
      this.seleccionado= new Categoria(-1,false,'');
    }


    public eliminarProducto (id: any){
      const confirmacion = window.confirm('¿Estás seguro de que deseas borrar este producto?');
      if(confirmacion){
        this.productoservice.deleteProducto(id).subscribe(
        algo => { 
          this.loadComponent();
          location.reload();
        }
        );
    }
    }

    onSelect(selectedValue: Categoria) {
      console.log('Opción seleccionada:', selectedValue);
      this.productoservice.getproductosbycategoria(selectedValue.id).subscribe(
        prod => { 
        console.log(prod);
        this.productos=  prod.filter((producto) => ((!producto.borrado)) );
        });
    }

    loadComponent() {
      //hacer que cada imagen se linkee al producto
      this.categoriaservice.getCategorias().subscribe(
        algo => { 
          this.lista=  algo as Categoria[];
        }
      )
      this.productoservice.getproductos().subscribe(
        data => { 
          console.log(data);
          this.productos=  data.filter((producto) => ((!producto.borrado)) ); 
          this.dataLoaded=true;
        }
      )
    }
    
}
