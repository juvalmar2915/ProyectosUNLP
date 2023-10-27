import { Injectable, inject } from "@angular/core";
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { of } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Ronda } from "./ronda";
import { Punto_Retiro } from "./punto-retiro";

const httpOptions = {
  headers: new HttpHeaders({
  'Content-Type': 'application/json',
  })
 };
@Injectable({
  providedIn: 'root'
})
export class PuntoRetiroService {
  public puntosretiro: Punto_Retiro[] = [];

  agregarPuntoretiro(puntoretiro: Punto_Retiro) {
    this.puntosretiro.push(puntoretiro);
  }
  obtenerPuntoretiro(): Punto_Retiro[] {
    return this.puntosretiro;
  }
  
  constructor(private http: HttpClient, private router: Router) { }
  
  public getPuntosRetiro() : Observable<Punto_Retiro[]> {
    return this.http.get('/rest/puntosretiro/todos')
    .pipe(map((data: any) =>
      data.map((puntoretiro: any) =>
        new Punto_Retiro(puntoretiro.id,puntoretiro.borrado,puntoretiro.nombre,puntoretiro.direccion)
    )
  )
  )
  }

  public getPuntoRetirobyid(id:any) : Observable<Punto_Retiro> {
    return this.http.get<Punto_Retiro>('/rest/puntosretiro/'+id)
    .pipe(map((puntoretiro: any) => new Punto_Retiro(puntoretiro.id,puntoretiro.borrado,puntoretiro.nombre,puntoretiro.direccion)
    )
    )
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => error);
  }
  public addPuntoRetiro(puntor: Punto_Retiro): Observable<Punto_Retiro> {
    const puntof ={
      nombre:puntor.nombre,
      direccion:puntor.direccion,
    }
    return this.http.post<Punto_Retiro>('/rest/puntosretiro', puntof, httpOptions)
  }
  public updatePuntoRetiro(puntor: Punto_Retiro): Observable<Punto_Retiro> {
    const puntof ={
      id:puntor.id,
      borrado:puntor.borrado,
      nombre:puntor.nombre,
      direccion:puntor.direccion,
    }
    return this.http.put<Punto_Retiro>('/rest/puntosretiro', puntof).pipe(
      catchError(this.handleError)
    );
  }
  public deletePuntoRetiro(id:String): Observable<Punto_Retiro>{
    return this.http.delete<Punto_Retiro>('/rest/puntosretiro/'+id)
  }
}
