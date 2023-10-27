import { Component } from '@angular/core';
import { Categoria } from '../modelos/categoria';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from '../modelos/categoria-service';

@Component({
  selector: 'app-categorias-edit',
  templateUrl: './categorias-edit.component.html',
  styleUrls: ['./categorias-edit.component.css']
})
export class CategoriasEditComponent {
  CategoriaId: number;
  categoria:Categoria;
  dataloaded:boolean;
  submitted:boolean;
  constructor(private route: ActivatedRoute,private categoriaservice: CategoriaService,private router: Router) { 
    this.CategoriaId=0;
    this.dataloaded=false;
    this.submitted=false;
    this.categoria=new Categoria(-1,false,'');
  }
  onSubmit() { 

    this.categoriaservice.updateCategoria(this.categoria)
    .subscribe(
      data => { 
      console.log(data);
      this.submitted = true;
      this.router.navigate(['/Categorias']);
      },
      error => {
      }
  );
  }
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.CategoriaId = +id;
      this.categoriaservice.getCategoriabyid(this.CategoriaId).subscribe(
        algo => { 
          this.categoria =algo as Categoria;
          this.dataloaded=true;

        }
      );

    } else {
      this.dataloaded=false;
    }
  }
}

