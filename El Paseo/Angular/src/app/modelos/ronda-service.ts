import { Injectable, inject } from "@angular/core";
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { of } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Ronda } from "./ronda";

const httpOptions = {
  headers: new HttpHeaders({
  'Content-Type': 'application/json',
  })
 };
@Injectable({
  providedIn: 'root'
})
export class RondaService {
  public rondas: Ronda[] = [];

  agregarRonda(ronda: Ronda) {
    this.rondas.push(ronda);
  }
  obtenerRondas(): Ronda[] {
    return this.rondas;
  }
  
  constructor(private http: HttpClient, private router: Router) { }
  
  public getrondas() : Observable<Ronda[]> {
    return this.http.get('/rest/rondas/todos')
    .pipe(map((data: any) =>
      data.map((ronda: any) =>
        new Ronda(ronda.nroRonda,ronda.borrado,ronda.fechaIni,ronda.fechaFin,ronda.fechaRetiro,ronda.horaIni,ronda.horaFin)
    )
  )
  )
  }
  
  public getRondabyid(id:any) : Observable<Ronda> {
    return this.http.get<Ronda>('/rest/rondas/'+id)
    .pipe(map((ronda: any) => new Ronda(ronda.nroRonda,ronda.borrado,ronda.fechaIni,ronda.fechaFin,ronda.fechaRetiro,ronda.horaIni,ronda.horaFin)
    )
    )
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => error);
  }
  public addRonda(ronda: Ronda): Observable<Ronda> {
    const rf ={
      fechaIni:ronda.fechaIni,
      fechaFin:ronda.fechaFin,
      fechaRetiro:ronda.fechaRetiro,
      horaIni:ronda.horaIni,
      horaFin:ronda.horaFin,
    }
    return this.http.post<Ronda>('/rest/rondas', rf, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  public updateRonda(ronda: Ronda): Observable<Ronda> {
    return this.http.put<Ronda>('/rest/rondas', ronda).pipe(
      catchError(this.handleError)
    );
  }
  public deleteRonda(id:String): Observable<Ronda>{
    return this.http.delete<Ronda>('/rest/rondas/'+id)
  }
}
