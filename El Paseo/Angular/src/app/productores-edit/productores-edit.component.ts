import { Component, OnInit } from '@angular/core';
import { ProductorService } from '../modelos/productor-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Productor } from '../modelos/productor';
import { ImagenService } from '../modelos/imagen-service';

@Component({
  selector: 'app-productores-edit',
  templateUrl: './productores-edit.component.html',
  styleUrls: ['./productores-edit.component.css']
})
export class ProductoresEditComponent implements OnInit{
  public errorMessage: string = '';
  dataloaded:boolean;
  selectedFile: File | null = null;
  productorid:number;
  model = new Productor(-1,false,'','','');
  submitted = false;
  constructor(private productorService: ProductorService,private router: Router,private route: ActivatedRoute,private imagenService: ImagenService) {
    this.productorid=0;
    this.dataloaded=false;
  }
  onSubmit(event: Event) { 
    event.preventDefault();
    if (this.selectedFile) { 
      this.model.foto= this.selectedFile.name;
    }
    this.productorService.updateProductor(this.model)
    .subscribe(
      data => { 
        if (this.selectedFile) { 
          this.imagenService.addImagenproductor(this.model.id,this.selectedFile).subscribe(
            imag => { 
              console.log(imag);
              this.productorService.agregarProductor(this.model);
              this.submitted = true;
              this.router.navigate(['/Productores']);
            }
          );
        }
        else{
          console.log(data);
          this.submitted = true;
          this.router.navigate(['/Productores']);
        }
      
      },
    );
    
  }
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.productorid = +id;
      this.productorService.getproductorbyid(this.productorid).subscribe(
        algo => { 
          this.model =algo as Productor;
          this.dataloaded=true;

        }
      );

    } else {
      this.dataloaded=false;
    }
  }
}
