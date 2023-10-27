import { Component } from '@angular/core';
import { Productor } from '../modelos/productor';
import { ProductorService } from '../modelos/productor-service';
import { Router } from '@angular/router';
import { ImagenService } from '../modelos/imagen-service';

@Component({
  selector: 'app-productores-form',
  templateUrl: './productores-form.component.html',
  styleUrls: ['./productores-form.component.css']
})
export class ProductoresFormComponent {
  public errorMessage: string = '';
  model = new Productor(-1,false,'','','');
  submitted = false;
  selectedFile: File | null = null;
  constructor(private productorService: ProductorService,private router: Router,private imagenService:ImagenService) {}
  onSubmit(event: Event) { 
    event.preventDefault();
    if (this.selectedFile) { 
      this.model.foto= this.selectedFile.name;
    
    this.productorService.addProductor(this.model)
    .subscribe(
      data => { 
      console.log(data);
      if (this.selectedFile) { 
        this.imagenService.addImagenproductor(data.id,this.selectedFile).subscribe(
          imag => { 
            console.log(imag);
            this.productorService.agregarProductor(this.model);
            this.submitted = true;
            this.router.navigate(['/Productores']);
          }
        );
      }
      },
    );
    }
    else{
      this.errorMessage="debe insertar una imagen";
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

}
