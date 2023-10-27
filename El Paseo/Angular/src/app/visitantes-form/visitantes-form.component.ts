import { Component } from '@angular/core';
import { Visitante } from '../modelos/visitante';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../modelos/usuario-service';
import { catchError, of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-visitantes-form',
  templateUrl: './visitantes-form.component.html',
  styleUrls: ['./visitantes-form.component.css']
})
export class VisitantesFormComponent {
  public errorMessage: string = '';
  model = new Visitante(-1,false,'', '', '', '');
  submitted = false;
  constructor(private usuarioService: UsuarioService,private router: Router) {}
  onSubmit() { 
    this.usuarioService.addVisitante(this.model)
    .subscribe(
      data => { 
      console.log(data);
      this.usuarioService.agregarVisitante(this.model);
      this.submitted = true;
      this.router.navigate(['/Visitantesh']);
      },
      error => {
        if (error.status === 409) {
          this.errorMessage = 'Email ya se encuentra en la base de datos';
        } else {
          this.errorMessage = 'Ha ocurrido un error. Por favor, inténtelo nuevamente.';
        }
      }
    );
    
    
    
  }
}
