import { Component } from '@angular/core';
import { Categoria } from '../modelos/categoria';
import { Productor } from '../modelos/productor';
import { Producto } from '../modelos/producto';
import { ProductoService } from '../modelos/producto-service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from '../modelos/categoria-service';
import { ProductorService } from '../modelos/productor-service';
import { ImagenService } from '../modelos/imagen-service';

@Component({
  selector: 'app-productos-edit',
  templateUrl: './productos-edit.component.html',
  styleUrls: ['./productos-edit.component.css']
})
export class ProductosEditComponent {
  public errorMessage: string = '';
  public dataloaded:boolean;
  public productoid:number
  selectedFile: File | null = null;
  categorias:Categoria[]=[];
  productores:Productor[]=[];
  p=new Productor(-1,false,'','','');
  c=new Categoria(-1,false,'');
  model = new Producto(-1,false,0,'','','',0,this.p,this.c);
  submitted = false;
  constructor(private productoService: ProductoService,private router: Router,private categoriaservice:CategoriaService,private productorservice:ProductorService,private route: ActivatedRoute,private imagenService:ImagenService) {
    this.dataloaded=false;
    this.productoid=0;
  }
  onSubmit(event: Event) {
    event.preventDefault();
    if (this.selectedFile) { 
      this.model.foto= this.selectedFile.name;
    }
    this.productoService.updateProducto(this.model)
    .subscribe(
      data => { 
      console.log(data);
      if (this.selectedFile) { 
        this.imagenService.addImagenproducto(this.model.id,this.selectedFile).subscribe(
          imag => { 
            console.log(imag);
            this.productoService.agregarProducto(this.model);
            this.submitted = true;
            this.router.navigate(['/Productos']);
          }
        );
      }
      else{
        this.productoService.agregarProducto(this.model);
        this.submitted = true;
        this.router.navigate(['/Productos']);
      }
      
      },
      err => { 
        this.errorMessage='algo salio mal';
      }
    );
    
  }
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.productoid = +id;
      this.productoService.getproductobyid(this.productoid).subscribe(
       prod =>{
        this.model=prod as Producto;
        console.log(this.model);
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
      )
    }
    else{
      this.dataloaded=false;
    }
  }
}
