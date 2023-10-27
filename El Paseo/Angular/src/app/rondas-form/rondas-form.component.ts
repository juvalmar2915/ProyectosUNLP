import { Component } from '@angular/core';
import { Ronda } from '../modelos/ronda';
import { ActivatedRoute, Router } from '@angular/router';
import { RondaService } from '../modelos/ronda-service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-rondas-form',
  templateUrl: './rondas-form.component.html',
  styleUrls: ['./rondas-form.component.css']
})
export class RondasFormComponent {
  ronda:Ronda;
  fecha:Date;
  submitted:boolean;
  errorMessage:string;
  constructor(private route: ActivatedRoute,private rondaservice: RondaService,private router: Router) { 
    this.submitted=false;
    this.errorMessage='';
    this.fecha=new Date();
    this.ronda=new Ronda(-1,false,this.fecha,this.fecha,this.fecha,this.fecha,this.fecha);
  }
  onSubmit() { 
    const fechaIni = new Date(this.ronda.fechaIni+'T'+this.ronda.horaIni+':00.000');
    this.ronda.fechaIni = fechaIni;
    const fechaFin = new Date(this.ronda.fechaFin+'T'+this.ronda.horaIni+':00.000');
    this.ronda.fechaFin = fechaFin;
    const fechaRetiro = new Date(this.ronda.fechaRetiro+'T'+this.ronda.horaIni+':00.000');
    this.ronda.fechaRetiro = fechaRetiro;
    const fechaHoraIni = new Date('2023-01-01T'+this.ronda.horaIni+':00.000');
    this.ronda.horaIni=fechaHoraIni;
    const fechaHoraFin = new Date('2023-01-01T'+this.ronda.horaFin+':00.000');
    this.ronda.horaFin=fechaHoraFin;
    this.rondaservice.addRonda(this.ronda).subscribe(
      algo => {
        console.log(algo);
        this.ronda = algo as Ronda;
        this.submitted = true;
        this.router.navigate(['/Rondas']);
      },
      err => {
        this.errorMessage = 'Ocurrio un error';
      }
  )
  }
}
