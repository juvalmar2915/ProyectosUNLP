import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { AdminService } from '../modelos/admin-service';
import { Admin } from '../modelos/admin';
import { delay } from 'rxjs';
@Component({
  selector: 'app-listaadmins',
  templateUrl: './listaadmins.component.html',
  styleUrls: ['./listaadmins.component.css'],
})
export class ListaadminsComponent implements OnInit{
  admins: any [];
  dataLoaded: boolean = false;
  ngOnInit(): void {
    this.loadComponent();
  }
  constructor(private adminService: AdminService) {
    this.admins = [];
  }
  public eliminarAdmin (id: any){
    this.adminService.deleteAdmin(id).subscribe(
      algo => { 
      this.loadComponent();
      location.reload();
      }
    );
    
  }
  public agregarAdmin (admin: any){
    this.adminService.addAdmin(admin).subscribe(
      data => { 
      console.log(data);
      this.loadComponent();
      location.reload();
      }
    );
  }
  loadComponent() {
    this.adminService.getAdmins().subscribe(
      data => { 
      console.log(data);
      this.admins=  data as Admin[];
      this.dataLoaded=true;
      });
  }
}