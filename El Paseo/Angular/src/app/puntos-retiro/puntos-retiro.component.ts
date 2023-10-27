import { Component, OnInit } from '@angular/core';
import { PuntoRetiroService } from '../modelos/punto-retiro-service';

@Component({
  selector: 'app-puntos-retiro',
  templateUrl: './puntos-retiro.component.html',
  styleUrls: ['./puntos-retiro.component.css']
})
export class PuntosRetiroComponent implements OnInit{
  puntosretiro: any [];
  dataLoaded: boolean = false;
  ngOnInit(): void {
    this.loadComponent();
  }
  constructor(private puntoRservice: PuntoRetiroService) {
    this.puntosretiro = [];
  }
  public eliminarPuntoRetiro (id: any){
    const confirmacion = window.confirm('¿Estás seguro de que deseas borrar este punto de retiro?');
    if(confirmacion){
    this.puntoRservice.deletePuntoRetiro(id).subscribe(
    algo => { 
      this.loadComponent();
      location.reload();
     }
    );
    }
    
  }

  

  loadComponent() {
    this.puntoRservice.getPuntosRetiro().subscribe(
      data => { 
      console.log(data);
      this.puntosretiro=  data.filter((puntosr) => (!puntosr.borrado)); 
      this.dataLoaded=true;
      });
  }

}
