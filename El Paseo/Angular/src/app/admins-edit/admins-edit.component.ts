import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../modelos/admin-service';
import { Admin } from '../modelos/admin';

@Component({
  selector: 'app-admins-edit',
  templateUrl: './admins-edit.component.html',
  styleUrls: ['./admins-edit.component.css']
})
export class AdminsEditComponent implements OnInit{
  adminId: number;
  admin:Admin;
  dataloaded:boolean;
  submitted:boolean;
  errorMessage:string;
  constructor(private route: ActivatedRoute,private adminservice: AdminService,private router: Router) { 
    this.adminId=0;
    this.dataloaded=false;
    this.submitted=false;
    this.errorMessage='';
    this.admin=new Admin(-1,false,'','','');
  }
  onSubmit() { 

    this.adminservice.updateAdmin(this.admin)
    .subscribe(
      data => { 
      console.log(data);
      this.submitted = true;
      this.router.navigate(['/ListaAdmins']);
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
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.adminId = +id;
      this.adminservice.getAdminbyid(this.adminId).subscribe(
        algo => { 
          this.admin =algo as Admin;
          this.dataloaded=true;

        }
      );

    } else {
      this.dataloaded=false;
    }
  }
}
