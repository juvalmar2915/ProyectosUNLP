import { Component, OnInit } from '@angular/core';
import { Punto_Retiro } from '../modelos/punto-retiro';
import { Direccion } from '../modelos/direccion';
import { Visitante } from '../modelos/visitante';
import { ActivatedRoute, Router } from '@angular/router';
import { PuntoRetiroService } from '../modelos/punto-retiro-service';
import { DireccionService } from '../modelos/direccion-service';

@Component({
  selector: 'app-punto-retiro-form',
  templateUrl: './punto-retiro-form.component.html',
  styleUrls: ['./punto-retiro-form.component.css']
})
export class PuntoRetiroFormComponent {
  puntoretiro:Punto_Retiro;
  direccion:Direccion;
  dataloaded:boolean;
  submitted:boolean;
  errorMessage:string;
  constructor(private route: ActivatedRoute,private puntoretiroservice: PuntoRetiroService,private router: Router,private direccionservice:DireccionService) { 
    this.dataloaded=false;
    this.submitted=false;
    this.errorMessage='';
    this.direccion=new Direccion(-1,false,'',-1,-1,'');
    this.puntoretiro=new Punto_Retiro(-1,false,'',this.direccion);
  }
  onSubmit() { 
    this.direccionservice.addDireccion(this.direccion).subscribe(
      algo => {
        this.direccion = algo as Direccion;
        this.puntoretiro.direccion = this.direccion;
        this.submitted = true;
        this.puntoretiroservice.addPuntoRetiro(this.puntoretiro)
          .subscribe(
            data => { 
            console.log(data);
            this.submitted = true;
            this.router.navigate(['/PuntosRetiro']);
            },
            error => {
                this.errorMessage = 'Ha ocurrido un error. Por favor, inténtelo nuevamente.';
            }
          );
      },
      err => {
        this.errorMessage = 'Debe ser un numero';
      }
  )
  }
}
