import { Injectable, inject } from "@angular/core";
import { Visitante } from "./visitante";
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { of } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Admin } from "./admin";
import { Categoria } from "./categoria";

const httpOptions = {
  headers: new HttpHeaders({
  'Content-Type': 'application/json',
  })
 };
@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
    public categorias: Categoria[] = [];

    agregarCategoria(categoria: Categoria) {
      this.categorias.push(categoria);
    }
    obtenerCategorias(): Categoria[] {
      return this.categorias;
    }
    
    constructor(private http: HttpClient, private router: Router) { }
    
    public getCategorias() : Observable<Categoria[]> {
      return this.http.get('/rest/categorias/todos')
      .pipe(map((data: any) =>
          data.map((categoria: any) =>
            new Categoria(categoria.id,categoria.borrado,categoria.nombre)
        )
      )
      )
      
    }
  
    public getCategoriabyid(id:any) : Observable<Categoria> {
      return this.http.get<Categoria>('/rest/categorias/'+id)
      .pipe(map((categoria: any) => new Categoria(categoria.id,categoria.borrado,categoria.nombre)
      )
      )
    }
  
    private handleError(error: HttpErrorResponse) {
      return throwError(() => error);
    }
    addCategoria(categoria: Categoria): Observable<Categoria> {
      const catFormateada = {
        id: null,
        borrado: categoria.borrado,
        nombre: categoria.nombre
      };
      return this.http.post<Categoria>('/rest/categorias', catFormateada, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
    }
  
    updateCategoria(categoria: Categoria): Observable<Categoria> {
        const catFormateada = {
            id: categoria.id,
            borrado: categoria.borrado,
            nombre: categoria.nombre
          };
      return this.http.put<Categoria>('/rest/categorias', catFormateada).pipe(
        catchError(this.handleError)
      );
    }
    public deleteCategoria(id:String): Observable<Categoria>{
      return this.http.delete<Categoria>('/rest/categorias/'+id)
    }
}
