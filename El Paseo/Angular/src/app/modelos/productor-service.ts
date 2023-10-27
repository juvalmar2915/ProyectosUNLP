import { Injectable, inject } from "@angular/core";
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { of } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Producto } from "./producto";
import { Productor } from "./productor";

const httpOptions = {
    headers: new HttpHeaders({
    'Content-Type': 'application/json',
    })
};
@Injectable({
    providedIn: 'root'
})
export class ProductorService {
    public productores: Productor[] = [];

    agregarProductor(productor: Productor) {
      this.productores.push(productor);
    }
    obtenerProductores(): Productor[] {
      return this.productores;
    }
    
    constructor(private http: HttpClient, private router: Router) { }
    
    public getproductores() : Observable<Productor[]> {
      return this.http.get('/rest/productores/todos')
      .pipe(map((data: any) =>
        data.map((productor: any) =>
          new Productor(productor.id,productor.borrado,productor.nombre,productor.descripcion,productor.foto)
      )
    )
    )
    
    }
  
    public getproductorbyid(id:any) : Observable<Productor> {
        return this.http.get<Productor>('/rest/productores/'+id)
        .pipe(map((productor: any) => new Productor(productor.id,productor.borrado,productor.nombre,productor.descripcion,productor.foto)
        )
        )
    }
  
    private handleError(error: HttpErrorResponse) {
      if (error.status == 409) {
        console.error('Productor sin nombre', error.error);
      }
      return throwError(() => error);
    }
    public addProductor(productor: Productor): Observable<Productor> {
        const productorFormateado = {
            nombre: productor.nombre,
            descripcion: productor.descripcion,
            foto: productor.foto
        };
      return this.http.post<Productor>('/rest/productores', productorFormateado, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
    }
    updateProductor(productor: Productor): Observable<Productor> {
        return this.http.put<Productor>('/rest/productores', productor).pipe(
          catchError(this.handleError)
        );
      }
    public deleteProductor(id:String): Observable<Productor>{
      return this.http.delete<Productor>('/rest/productores/'+id)
    }
}