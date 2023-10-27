import { Component, OnInit } from '@angular/core';
import { Visitante } from '../modelos/visitante';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../modelos/usuario-service';
import { Direccion } from '../modelos/direccion';
import { DireccionService } from '../modelos/direccion-service';
import { LoginService } from '../modelos/login.service';

@Component({
  selector: 'app-visitantes-edit',
  templateUrl: './visitantes-edit.component.html',
  styleUrls: ['./visitantes-edit.component.css']
})
export class VisitantesEditComponent implements OnInit{
  visitante:Visitante;
  contrasena:string;
  contrasena2:string;
  contrasena3:string;
  errorMessage2: string;
  errorMessage3: string;
  direccion:Direccion;
  direcciones:Direccion[]=[];
  dataloaded:boolean;
  submitted:boolean;
  errorMessage:string;
  isLogged: boolean = false;
  rol = "loguear";
  idCliente:any;

  constructor(private visitanteservice: UsuarioService,private router: Router,private direccionservice:DireccionService, private loginService:LoginService) { 
    this.dataloaded=false;
    this.submitted=false;
    this.errorMessage='';
    this.contrasena='';
    this.contrasena2='';
    this.contrasena3='';
    this.errorMessage2='';
    this.errorMessage3='';
    this.visitante=new Visitante(-1,false,'','','','');
    this.direccion=new Direccion(-1,false,'',-1,-1,'',this.visitante);
  }

  ngOnInit(): void {
    this.loginService.obtenerDatosDeSesion().subscribe(
      (datos)=>{
        console.log(datos);
        this.isLogged = datos.logged;
        this.rol = datos.rol;
        this.idCliente = datos.id;
        this.loadComponent();
      },
      (error)=>{
      }
    );
  }

  onSubmit() { 
    console.log(this.visitante);
    if (this.contrasena===this.visitante.contrasena){
      if (this.contrasena2===this.contrasena3){
        if ((this.contrasena2!='')){
          this.visitante.contrasena=this.contrasena2;
        }
        this.visitanteservice.updateVisitante(this.visitante)
        .subscribe(
          data => { 
          console.log(data);
          this.submitted = true;
          this.router.navigate(['/Catalogo']);
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
      else{
        this.errorMessage2 = 'Debe escribir la contraseña nueva o contraseña nueva no concuerda con la que volvio a escribir';
      }
    }
    else{
      this.errorMessage3 = 'Contraseña actual incorrecta';
    }
  }

  loadComponent(){
    if(this.isLogged){
    this.visitanteservice.getVisitante(this.idCliente).subscribe(
        algo => { 
          this.visitante =algo as Visitante;
          this.direccionservice.getdireccionesdeusuario(this.idCliente).subscribe(
            dirs => { 
              this.direcciones=dirs.filter((dir) => (!dir.borrado));
              this.dataloaded=true;
            }
          )
        }
    );
  }
  }

  EliminarDireccion(){
    const confirmacion = window.confirm('¿Estás seguro de que deseas borrar esta direccion?');
    if(confirmacion){
    if (this.direccion.id!=-1){
      this.direccionservice.deleteDireccion(this.direccion.id).subscribe(
        data =>{
          this.loadComponent();
          location.reload();
        }
      )
    }
    }
  }

}
