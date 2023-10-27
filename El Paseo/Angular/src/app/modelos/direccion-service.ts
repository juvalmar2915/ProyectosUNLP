import { Injectable, inject } from "@angular/core";
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { of } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Direccion } from "./direccion";

const httpOptions = {
  headers: new HttpHeaders({
  'Content-Type': 'application/json',
  })
 };
@Injectable({
  providedIn: 'root'
})
export class DireccionService {
    public direccion: Direccion[] = [];

  agregarDireccion(direccion: Direccion) {
    this.direccion.push(direccion);
  }
  obtenerDireccion(): Direccion[] {
    return this.direccion;
  }
  
  constructor(private http: HttpClient, private router: Router) { }
  
  public getdirecciones() : Observable<Direccion[]> {
    return this.http.get('/rest/direcciones/todos')
    .pipe(map((data: any) =>
      data.map((direccion: any) =>
        new Direccion(direccion.id,direccion.borrado,direccion.calle,direccion.numero,direccion.piso,direccion.descipcion,direccion.visitante)
    )
  )
  )
  }

  public getdireccionesdeusuario(id: number) : Observable<Direccion[]> {
    return this.http.get('/rest/direcciones/'+id)
    .pipe(map((data: any) =>
      data.map((direccion: any) =>
        new Direccion(direccion.id,direccion.borrado,direccion.calle,direccion.numero,direccion.piso,direccion.descipcion,direccion.visitante)
    )
  )
  )
  }
  private handleError(error: HttpErrorResponse) {
    return throwError(() => error);
  }
  
  public addDireccion(direccion: Direccion): Observable<Direccion> {
    if(direccion.v != null){
      const usuarioFormateado = {
        id: direccion.v.id,
        borrado: direccion.v.borrado,
        nombre: direccion.v.nombre,
        email: direccion.v.email,
        contraseña: direccion.v.contrasena,
        telefono: direccion.v.telefono
      }
      const direccionf ={
        calle: direccion.calle,
        numero: direccion.numero,
        piso: direccion.piso,
        descripcion: direccion.descripcion,
        visitante: usuarioFormateado,
      }
      return this.http.post<Direccion>('/rest/direcciones', direccionf, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
    }else{
      const direccionf ={
        calle: direccion.calle,
        numero: direccion.numero,
        piso: direccion.piso,
        descripcion: direccion.descripcion,
        visitante: direccion.v,
      }
      return this.http.post<Direccion>('/rest/direcciones', direccionf, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
    }
  }

  public updateDireccion(direccion: Direccion): Observable<Direccion> {
    const direccionf ={
      id: direccion.id,
      borrado: direccion.borrado,
      calle: direccion.calle,
      numero: direccion.numero,
      piso: direccion.piso,
      descripcion: direccion.descripcion,
      visitante: direccion.v,
    }
    return this.http.put<Direccion>('/rest/direcciones', direccionf).pipe(
      catchError(this.handleError)
    );
  }

  public deleteDireccion(id:number): Observable<Direccion>{
    return this.http.delete<Direccion>('/rest/direcciones/'+id)
  }
}