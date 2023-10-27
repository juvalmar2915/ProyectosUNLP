import { Component, OnInit } from '@angular/core';
import { Punto_Retiro } from '../modelos/punto-retiro';
import { Direccion } from '../modelos/direccion';
import { ActivatedRoute, Router } from '@angular/router';
import { PuntoRetiroService } from '../modelos/punto-retiro-service';
import { DireccionService } from '../modelos/direccion-service';

@Component({
  selector: 'app-punto-retiro-edit',
  templateUrl: './punto-retiro-edit.component.html',
  styleUrls: ['./punto-retiro-edit.component.css']
})
export class PuntoRetiroEditComponent implements OnInit{
  prid:number;
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
    this.prid=0;
  }
  onSubmit() { 
    this.direccionservice.updateDireccion(this.direccion).subscribe(
      algo => {
        this.direccion = algo as Direccion;
        this.puntoretiro.direccion = this.direccion;
        this.submitted = true;
        this.puntoretiroservice.updatePuntoRetiro(this.puntoretiro)
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

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.prid = +id;
      this.puntoretiroservice.getPuntoRetirobyid(this.prid).subscribe(
        algo => { 
          this.puntoretiro =algo as Punto_Retiro;
          this.direccion= this.puntoretiro.direccion;
          this.dataloaded=true;

        }
      );

    } else {
      this.dataloaded=false;
    }
  }
}
