import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../modelos/categoria-service';
import { ProductoService } from '../modelos/producto-service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {
  categorias: any [];
  dataLoaded: boolean = false;
  ngOnInit(): void {
    this.loadComponent();
  }
  constructor(private categoriaservice: CategoriaService, private productoservice: ProductoService) {
    this.categorias = [];
  }
  public eliminarCategoria (id: any){ 
    const confirmacion = window.confirm('¿Estás seguro de que deseas borrar esta categoria? (se borraran tambien los productos asociados a esta)');
    if(confirmacion){
    this.categoriaservice.deleteCategoria(id).subscribe(
    algo => { 
      this.loadComponent();
      location.reload();
     }
    );
    }
    
  }


  loadComponent() {
    
    this.categoriaservice.getCategorias().subscribe(
      data => { 
      console.log(data);
      this.categorias=  data.filter((categoria) => ((!categoria.borrado)) ); 
      for (let i = 0; i < this.categorias.length; i++) {
        this.productoservice.getproductosbycategoria(this.categorias[i].id).subscribe(
          algo => { 
            console.log(algo);
            algo = algo.filter( (producto) => ((!producto.borrado)));
            const objeto = { id: this.categorias[i].id, nombre: this.categorias[i].nombre, cantidad: algo.length };
            this.categorias[i]=objeto;
          }
        )
      }
      this.dataLoaded=true;
      }
      )    
         
  }
  
}
