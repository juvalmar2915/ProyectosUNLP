import { Component } from '@angular/core';
import { RondaService } from '../modelos/ronda-service';

@Component({
  selector: 'app-rondas',
  templateUrl: './rondas.component.html',
  styleUrls: ['./rondas.component.css']
})
export class RondasComponent {
  rondas: any [];
  dataLoaded: boolean = false;
    ngOnInit(): void {
      this.loadComponent();
    }
    constructor(private rondaservice: RondaService) {
      this.rondas = [];
    }
    public eliminarRonda (id: any){
      const confirmacion = window.confirm('¿Estás seguro de que deseas borrar esta ronda?');
      if(confirmacion){
      this.rondaservice.deleteRonda(id).subscribe(
      algo => { 
        this.loadComponent();
        location.reload();
       }
      );
      }
      
    }

    loadComponent() {
      this.rondaservice.getrondas().subscribe(
        data => { 
        console.log(data);
        this.rondas=  data.filter((ronda) => (!ronda.borrado) ); 
        this.dataLoaded=true;
        });
    }

    
}
