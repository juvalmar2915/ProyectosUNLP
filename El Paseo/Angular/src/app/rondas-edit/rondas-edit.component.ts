import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RondaService } from '../modelos/ronda-service';
import { Ronda } from '../modelos/ronda';

@Component({
  selector: 'app-rondas-edit',
  templateUrl: './rondas-edit.component.html',
  styleUrls: ['./rondas-edit.component.css']
})
export class RondasEditComponent {
  rondaid:number;
  ronda:Ronda;
  fechaini1:any;
  fechafin1:any;
  fecharet1:any;
  fecha:any;
  fecha2:any;
  dataloaded:boolean
  submitted:boolean;
  errorMessage:string;
  constructor(private route: ActivatedRoute,private rondaservice: RondaService,private router: Router) { 
    this.submitted=false;
    this.errorMessage='';
    this.fechaini1=new Date();
    this.fechafin1=new Date();
    this.fecharet1=new Date();
    this.fecha=new Date();
    this.fecha2=new Date();
    this.ronda=new Ronda(-1,false,this.fecha,this.fecha,this.fecha,this.fecha,this.fecha);
    this.rondaid=0;
    this.dataloaded=false;
  }
  onSubmit() { 
    if (!(this.fechaini1 instanceof Date)){
      const fechaIni = new Date(this.fechaini1+'T'+'12:00'+':00.000');
      this.ronda.fechaIni = fechaIni;
      console.log(this.fechaini1);
    }
    if (!(this.fechafin1 instanceof Date)) {
      const fechaFin = new Date(this.fechafin1+'T'+'12:00'+':00.000');
      this.ronda.fechaFin = fechaFin;
      console.log(fechaFin);
    }
    if (!(this.fecharet1 instanceof Date)) {
      const fechaRetiro = new Date(this.fecharet1+'T'+'12:00'+':00.000');
      this.ronda.fechaRetiro = fechaRetiro;
    }
    
    if (!(this.fecha instanceof Date)) {
      const fechaHoraIni = new Date('2023-01-01T'+this.fecha+':00.000');
      console.log(this.fecha);
      this.ronda.horaIni=fechaHoraIni;
    }
    if (!(this.fecha2 instanceof Date)){
      const fechaHoraFin = new Date('2023-01-01T'+this.fecha2+':00.000');
      this.ronda.horaFin=fechaHoraFin;
    }
    
    this.rondaservice.updateRonda(this.ronda).subscribe(
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

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.rondaid = +id;
      this.rondaservice.getRondabyid(this.rondaid).subscribe(
        algo => { 
          this.ronda =algo as Ronda;
          console.log(this.ronda);
          this.dataloaded=true;

        }
      );

    } else {
      this.dataloaded=false;
    }
  }
}
