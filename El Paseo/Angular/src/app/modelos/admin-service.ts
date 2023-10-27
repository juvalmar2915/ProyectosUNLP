import { Injectable, inject } from "@angular/core";
import { Visitante } from "./visitante";
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { of } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Admin } from "./admin";

const httpOptions = {
  headers: new HttpHeaders({
  'Content-Type': 'application/json',
  })
 };
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  public admins: Admin[] = [];

  agregarAdmin(admin: Admin) {
    this.admins.push(admin);
  }
  obtenerAdmins(): Admin[] {
    return this.admins;
  }
  
  constructor(private http: HttpClient, private router: Router) { }
  
  public getAdmins() : Observable<Admin[]> {
    return this.http.get('/rest/admins/todos')
    .pipe(map((data: any) =>
        data.map((admin: any) =>
          new Admin(admin.id,admin.borrado,admin.nombre, admin.email, admin.contraseña)
      )
    )
    )
    
  }

  public getAdminbyid(id:any) : Observable<Admin> {
    return this.http.get<Admin>('/rest/admins/'+id)
    .pipe(map((admin: any) => new Admin (admin.id,admin.borrado,admin.nombre, admin.email, admin.contraseña)
    )
    )
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status == 409) {
      console.error('Email ya se encuentra en la base de datos', error.error);
    }
    return throwError(() => error);
  }
  addAdmin(admin: Admin): Observable<Admin> {
    const adminFormateado = {
      id: null,
      borrado: admin.borrado,
      nombre: admin.nombre,
      email: admin.email,
      contraseña: admin.contrasena
    };
    return this.http.post<Admin>('/rest/admins', adminFormateado, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  updateAdmin(admin: Admin): Observable<Admin> {
    const adminFormateado = {
      id: admin.id,
      borrado: admin.borrado,
      nombre: admin.nombre,
      email: admin.email,
      contraseña: admin.contrasena
    };
    return this.http.put<Admin>('/rest/admins', adminFormateado).pipe(
      catchError(this.handleError)
    );
  }
  public deleteAdmin(id:String): Observable<Admin>{
    return this.http.delete<Admin>('/rest/admins/'+id)
  }
}
