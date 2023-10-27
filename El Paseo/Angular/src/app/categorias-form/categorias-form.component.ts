import { Component } from '@angular/core';
import { Categoria } from '../modelos/categoria';
import { CategoriaService } from '../modelos/categoria-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categorias-form',
  templateUrl: './categorias-form.component.html',
  styleUrls: ['./categorias-form.component.css']
})
export class CategoriasFormComponent {
  public errorMessage: string = '';
  model = new Categoria(-1,false,'');
  submitted = false;
  constructor(private categoriaService: CategoriaService,private router: Router) {}
  onSubmit() { 
    this.categoriaService.addCategoria(this.model)
    .subscribe(
      data => { 
      console.log(data);
      this.categoriaService.agregarCategoria(this.model);
      this.submitted = true;
      this.router.navigate(['/Categorias']);
      },
    );
    
  }
}
