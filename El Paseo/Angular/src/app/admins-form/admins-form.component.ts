import { Component } from '@angular/core';
import { Visitante } from '../modelos/visitante';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Admin } from '../modelos/admin';
import { AdminService } from '../modelos/admin-service';
@Component({
  selector: 'app-admins-form',
  templateUrl: './admins-form.component.html',
  styleUrls: ['./admins-form.component.css']
})
export class AdminsFormComponent {
  public errorMessage: string = '';
  model = new Admin(-1,false,'', '', '');
  submitted = false;
  constructor(private adminService: AdminService,private router: Router) {}
  onSubmit() { 
    this.adminService.addAdmin(this.model)
    .subscribe(
      data => { 
      console.log(data);
      this.adminService.agregarAdmin(this.model);
      this.submitted = true;
      this.router.navigate(['/ListaAdmins']);
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
