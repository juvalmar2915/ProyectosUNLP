import { Injectable, inject } from "@angular/core";
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { of } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Producto } from "./producto";

const httpOptions = {
    headers: new HttpHeaders({
    'Content-Type': 'application/json',
    })
};
@Injectable({
    providedIn: 'root'
})
export class ProductoService {
    public productos: Producto[] = [];

  agregarProducto(producto: Producto) {
    this.productos.push(producto);
  }
  obtenerProductos(): Producto[] {
    return this.productos;
  }
  
  constructor(private http: HttpClient, private router: Router) { }
  
  public getproductos() : Observable<Producto[]> {
    return this.http.get('/rest/productos/todos')
    .pipe(map((data: any) =>
      data.map((producto: any) =>
        new Producto(producto.id,producto.borrado ,producto.precio, producto.foto, producto.descripcion, producto.nombre, producto.stock, producto.productor,producto.categoria)
    )
  )
  )
  
  }

  public getproductosbycategoria(id:any) : Observable<Producto[]> {
    return this.http.get('/rest/productos/categoria/'+id)
    .pipe(map((data: any) =>
      data.map((producto: any) =>
        new Producto(producto.id,producto.borrado ,producto.precio, producto.foto, producto.descripcion, producto.nombre, producto.stock, producto.productor,producto.categoria)
    )
  )
  )
  
  }

  public getproductobyid(id:any) : Observable<Producto> {
    return this.http.get('/rest/productos/'+id)
    .pipe(map( (producto: any) =>
        new Producto(producto.id,producto.borrado ,producto.precio, producto.foto, producto.descripcion, producto.nombre, producto.stock, producto.productor,producto.categoria)
    )
    )
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status == 409) {
      console.error('Producto sin precio o nombre', error.error);
    }
    return throwError(() => error);
  }
  public addProducto(producto: Producto): Observable<Producto> {
    const productof={
      precio:producto.precio,
      foto:producto.foto,
      descripcion:producto.descripcion,
      nombre:producto.nombre,
      stock:producto.stock,
	    productor:producto.productor,
	    categoria:producto.categoria,
    }
    return this.http.post<Producto>('/rest/productos', productof, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }
  public updateProducto(producto: Producto): Observable<Producto> {
    return this.http.put<Producto>('/rest/productos', producto)
    .pipe(
      catchError(this.handleError)
    );
  }
  public deleteProducto(id:String): Observable<Producto>{
    return this.http.delete<Producto>('/rest/productos/'+id)
  }
}
