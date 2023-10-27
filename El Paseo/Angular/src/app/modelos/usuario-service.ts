import { Injectable, inject } from "@angular/core";
import { Visitante } from "./visitante";
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { of } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
  'Content-Type': 'application/json',
  })
 };
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public visitantes: Visitante[] = [];

  agregarVisitante(visitante: Visitante) {
    this.visitantes.push(visitante);
  }
  obtenerVisitantes(): Visitante[] {
    return this.visitantes;
  }
  
  constructor(private http: HttpClient, private router: Router) { }
  
  public getvisitantes() : Observable<Visitante[]> {
    return this.http.get('/rest/visitantes/todos')
    .pipe(map((data: any) =>
      data.map((visitante: any) =>
        new Visitante(visitante.id,visitante.borrado ,visitante.nombre, visitante.email, visitante.contraseña, visitante.telefono)
    )
  )
  )
  
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status == 409) {
      console.error('Email ya se encuentra en la base de datos', error.error);
    }
    if (error.status == 404){
      console.error('Usuario no encontrado', error.error);
    }
    return throwError(() => error);
  }

  public getVisitante(id: number): Observable<Visitante> {
    return this.http.get<Visitante>('/rest/visitantes/'+id).pipe(
      map((visitante: any) =>
        new Visitante(visitante.id,visitante.borrado ,visitante.nombre, visitante.email, visitante.contraseña, visitante.telefono)),
      catchError(this.handleError)
    );
  }
  public addVisitante(visitante: Visitante): Observable<Visitante> {
    const usuarioFormateado = {
      nombre: visitante.nombre,
      email: visitante.email,
      contraseña: visitante.contrasena,
      telefono: visitante.telefono
    };
    return this.http.post<Visitante>('/rest/visitantes', usuarioFormateado, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  updateVisitante(visitante: Visitante): Observable<Visitante> {
    const usuarioFormateado = {
      id: visitante.id,
      borrado: visitante.borrado,
      nombre: visitante.nombre,
      email: visitante.email,
      contraseña: visitante.contrasena,
      telefono: visitante.telefono
    };
    return this.http.put<Visitante>('/rest/visitantes', usuarioFormateado).pipe(
      catchError(this.handleError)
    );
  }

  public deleteVisitante(id:String): Observable<Visitante>{
    return this.http.delete<Visitante>('/rest/visitantes/'+id)
  }
}
