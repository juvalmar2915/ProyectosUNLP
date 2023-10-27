import { Injectable, inject } from "@angular/core";
import { Visitante } from "./visitante";
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { of } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

const httpOptions = {
    headers: new HttpHeaders()
 };
 @Injectable({
    providedIn: 'root'
  })
export class ImagenService {
    public foto: File[] = [];
    
    constructor(private http: HttpClient, private router: Router) { }
    
  
    public getImagenbyidProducto(id:any) : Observable<String> {
      return this.http.get('/rest/imagen/producto/' + id, { responseType: 'text' });
    }

    public getImagenbyidProductor(id:any) : Observable<String> {
      return this.http.get('/rest/imagen/productor/' + id, { responseType: 'text' });
    }
  
    private handleError(error: HttpErrorResponse) {
      return throwError(() => error);
    }
    addImagenproducto(id: number,file:File): Observable<File> {
      const formData: FormData = new FormData();
      formData.append('file', file);
      formData.append('id', id.toString());
      return this.http.post<File>('/rest/imagen/producto/'+id, formData, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
    }

    addImagenproductor(id: number,file:File): Observable<File> {
        const formData: FormData = new FormData();
        formData.append('file', file);
        formData.append('id', id.toString());
        return this.http.post<File>('/rest/imagen/productor/'+id, formData, httpOptions)
        .pipe(
          catchError(this.handleError)
        );
    }
  
}
