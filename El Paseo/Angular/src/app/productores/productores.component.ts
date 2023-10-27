import { Component } from '@angular/core';
import { ProductorService } from '../modelos/productor-service';
import { LoginService } from '../modelos/login.service';

@Component({
  selector: 'app-productores',
  templateUrl: './productores.component.html',
  styleUrls: ['./productores.component.css']
})
export class ProductoresComponent {
  productores: any [];
  dataLoaded: boolean = false;
  rol:any;

  ngOnInit(): void {
    this.loadComponent();
  }
  constructor(private productoreservice: ProductorService, private loginService:LoginService) {
    this.productores = [];

  }
  public eliminarProductor (id: any){
    const confirmacion = window.confirm('¿Estás seguro de que deseas borrar este productor? (Se borraran tambien los productos asociados al mismo)');
    if(confirmacion){
    this.productoreservice.deleteProductor(id).subscribe(
    algo => { 
      this.loadComponent();
      location.reload();
     }
    );
    }
  }


  loadComponent() {
    this.rol = this.loginService.getRol();
    this.productoreservice.getproductores().subscribe(
      data => { 
      console.log(data);
      this.productores=  data.filter((productor) => ((!productor.borrado)) );
      this.dataLoaded=true;
      });
      this.rol = this.loginService.getRol(); 
  }
}
