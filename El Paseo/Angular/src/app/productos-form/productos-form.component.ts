import { Component, OnInit } from '@angular/core';
import { Producto } from '../modelos/producto';
import { ProductoService } from '../modelos/producto-service';
import { Router } from '@angular/router';
import { Productor } from '../modelos/productor';
import { Categoria } from '../modelos/categoria';
import { CategoriaService } from '../modelos/categoria-service';
import { ProductorService } from '../modelos/productor-service';
import { ImagenService } from '../modelos/imagen-service';

@Component({
  selector: 'app-productos-form',
  templateUrl: './productos-form.component.html',
  styleUrls: ['./productos-form.component.css']
})
export class ProductosFormComponent implements OnInit{
  public errorMessage: string = '';
  selectedFile: File | null = null;
  public dataloaded:boolean;
  categorias:Categoria[]=[];
  productores:Productor[]=[];
  p=new Productor(-1,false,'','','');
  c=new Categoria(-1,false,'');
  model = new Producto(-1,false,0,'','','',0,this.p,this.c);
  submitted = false;
  constructor(private productoService: ProductoService,private router: Router,private categoriaservice:CategoriaService,private productorservice:ProductorService, private imagenService: ImagenService) {
    this.dataloaded=false;
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }
  

  onSubmit(event: Event) { 
    event.preventDefault();
    if (this.selectedFile) {
      this.model.foto= this.selectedFile.name;
      this.productoService.addProducto(this.model)
      .subscribe(
        data => { 
          console.log(data);
          if (this.selectedFile){
            this.imagenService.addImagenproducto(data.id,this.selectedFile).subscribe(
              imag => { 
                console.log(imag);
                this.productoService.agregarProducto(this.model);
                this.submitted = true;
                this.router.navigate(['/Productos']);
              }
            );
          }
      
        },
        err => { 
          this.errorMessage='algo salio mal';
        }
      );
    }
    else{
      this.errorMessage="debe insertar una imagen";
    }
    
  }
  ngOnInit(): void {
   this.categoriaservice.getCategorias().subscribe(
    algo => { 
      this.categorias=algo as Categoria[];
      this.productorservice.getproductores().subscribe(
        algo2 => {
          this.productores=algo2 as Productor[];
          this.dataloaded=true;
        }
      )
    },
   )
  }
}
