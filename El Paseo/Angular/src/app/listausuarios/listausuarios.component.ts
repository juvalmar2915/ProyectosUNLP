import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../modelos/usuario-service';
import { Visitante } from '../modelos/visitante';
@Component({
  selector: 'app-listausuarios',
  templateUrl: './listausuarios.component.html',
  styleUrls: ['./listausuarios.component.css']
})
export class ListausuariosComponent implements OnInit{
  usuarios: any [];
  dataLoaded: boolean = false;
  ngOnInit(): void {
    this.loadComponent();
  }
  constructor(private usuarioService: UsuarioService) {
    this.usuarios = [];
  }
  public eliminarVisitante (id: any){
    const confirmacion = window.confirm('¿Estás seguro de que deseas banear a este usuario? (No podra cambiar dicha eleccion)');
    if(confirmacion){
    this.usuarioService.deleteVisitante(id).subscribe(
     algo => { 
      this.loadComponent();
      location.reload();
     }
    );
    }
    
  }
  loadComponent() {
    this.usuarioService.getvisitantes().subscribe(
      data => { 
      console.log(data);
      this.usuarios=  data.filter((visitante) => !visitante.borrado);
      this.dataLoaded=true;
      });
  }
}
