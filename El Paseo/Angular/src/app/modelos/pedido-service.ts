import { Injectable, inject } from "@angular/core";
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Pedido } from "./pedido";
import { BehaviorSubject, Observable, throwError } from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({
    'Content-Type': 'application/json',
    })
};
@Injectable({
    providedIn: 'root'
})
export class PedidoService {
    public pedidos: Pedido[] = [];
    public productosf: any[] = [];

  agregarPedido(pedido: Pedido) {
    this.pedidos.push(pedido);
  }
  obtenerPedidos(): Pedido[] {
    return this.pedidos;
  }
  
  //CONSULTAR datosDeSession: BehaviorSubject<any> = new BehaviorSubject<any>({cantidad:0});

  constructor(private http: HttpClient, private router: Router) { }
  
  public getpedidos() : Observable<Pedido[]> {
    return this.http.get('/rest/pedidos/todos')
    .pipe(map((data: any) =>
      data.map((pedido: any) =>
        new Pedido(pedido.id,pedido.borrado,pedido.estado, pedido.tipoEntrega, pedido.total, pedido.fecha, pedido.visitante,pedido.ronda, pedido.productos,pedido.direccion,pedido.puntoRetiro)
    )
  )
  )
  }

  public getpedidosbyuser(id: number) : Observable<Pedido[]> {
    return this.http.get('/rest/pedidos/cliente/'+id)
    .pipe(map((data: any) =>
      data.map((pedido: any) =>
        new Pedido(pedido.id,pedido.borrado,pedido.estado, pedido.tipoEntrega, pedido.total, pedido.fecha, pedido.visitante,pedido.ronda, pedido.productos,pedido.direccion,pedido.puntoRetiro)
    )
  )
  )
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status == 404) {
      console.error('Pedido no encontrado en la base de datos', error.error);
    }
    if (error.status == 409) {
        console.error('Persona ya creo pedido en esta ronda', error.error);
    }
    return throwError(() => error);
  }
  //hace que en caso de volver a agregar se siga actualizando el carrito
  public addPedido(pedido: Pedido): Observable<Pedido> {
    this.productosf=[];
    const usuarioFormateado = {
        id: pedido.visitante.id,
        borrado: pedido.visitante.borrado,
        nombre: pedido.visitante.nombre,
        email: pedido.visitante.email,
        contraseña: pedido.visitante.contrasena,
        telefono: pedido.visitante.telefono
    };
    for (let i = 0; i < pedido.productos.length; i++) {
      const productoformat ={
        id: pedido.productos[i].id,
        borrado: pedido.productos[i].borrado,
        precio: pedido.productos[i].precio,
        foto: pedido.productos[i].foto,
        descripcion: pedido.productos[i].descripcion,
        nombre: pedido.productos[i].nombre,
        stock: pedido.productos[i].stock,
        productor: pedido.productos[i].productor
      }
      this.productosf[i]=productoformat;
    }
    const pedidoformat = {
        estado:"",
        tipoEntrega: "",
        total: pedido.total,
        fecha: new Date(),
        visitante: usuarioFormateado,
        direccion: null,
        puntoRetiro: null,
        ronda: pedido.ronda,
        productos: this.productosf,
    };
    return this.http.post<Pedido>('/rest/pedidos', pedidoformat, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }
  //para agregar productos al carrito
  public editPedido1(pedido: Pedido): Observable<Pedido> {
    const usuarioFormateado = {
      id: pedido.visitante.id,
      borrado: pedido.visitante.borrado,
      nombre: pedido.visitante.nombre,
      email: pedido.visitante.email,
      contraseña: pedido.visitante.contrasena,
      telefono: pedido.visitante.telefono
    };
    const pedidoformat = {
        estado:"",
        tipoEntrega: pedido.tipoEntrega,
        total: pedido.total,
        fecha: pedido.fecha,
        visitante: usuarioFormateado,
        direccion: pedido.direccion,
        puntoRetiro: pedido.puntoRetiro,
        ronda: pedido.ronda,
        productos: pedido.productos,
    };
    return this.http.put<Pedido>('/rest/pedidos/editable', pedidoformat, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }
  //para borrar productos del carrito
  public editPedido2(pedido: Pedido): Observable<Pedido> {
    const usuarioFormateado = {
      id: pedido.visitante.id,
      borrado: pedido.visitante.borrado,
      nombre: pedido.visitante.nombre,
      email: pedido.visitante.email,
      contraseña: pedido.visitante.contrasena,
      telefono: pedido.visitante.telefono
    };
    const pedidoformat = {
        estado:"",
        tipoEntrega: pedido.tipoEntrega,
        total: pedido.total,
        fecha: pedido.fecha,
        visitante: usuarioFormateado,
        direccion: pedido.direccion,
        puntoRetiro: pedido.puntoRetiro,
        ronda: pedido.ronda,
        productos: pedido.productos,
    };
    return this.http.put<Pedido>('/rest/pedidos/editable2', pedidoformat, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  public vaciarPedido(pedido: Pedido): Observable<Pedido> {
    const usuarioFormateado = {
      id: pedido.visitante.id,
      borrado: pedido.visitante.borrado,
      nombre: pedido.visitante.nombre,
      email: pedido.visitante.email,
      contraseña: pedido.visitante.contrasena,
      telefono: pedido.visitante.telefono
    };
    const pedidoformat = {
        estado:"",
        tipoEntrega: pedido.tipoEntrega,
        total: 0,
        fecha: pedido.fecha,
        visitante: usuarioFormateado,
        direccion: pedido.direccion,
        puntoRetiro: pedido.puntoRetiro,
        ronda: pedido.ronda,
        productos: [],
    };
    return this.http.put<Pedido>('/rest/pedidos/vaciar', pedidoformat, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  public confirmarpedido(pedido: Pedido): Observable<Pedido> {
    const usuarioFormateado = {
      id: pedido.visitante.id,
      borrado: pedido.visitante.borrado,
      nombre: pedido.visitante.nombre,
      email: pedido.visitante.email,
      contraseña: pedido.visitante.contrasena,
      telefono: pedido.visitante.telefono
    };
    if (pedido.direccion){
      const direcformat={
        id:pedido.direccion.id,
        borrado: pedido.direccion.borrado,
        calle: pedido.direccion.calle,
        numero:pedido.direccion.numero,
        piso:pedido.direccion.piso,
        descripcion:pedido.direccion.descripcion,
        visitante:pedido.direccion.v,
      }
      const pedidoformat = {
        estado:"",
        tipoEntrega: pedido.tipoEntrega,
        total: pedido.total,
        fecha: pedido.fecha,
        visitante: usuarioFormateado,
        direccion: direcformat,
        puntoRetiro: pedido.puntoRetiro,
        ronda: pedido.ronda,
        productos: pedido.productos,
      };
      return this.http.put<Pedido>('/rest/pedidos/confirmado', pedidoformat, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
    }
    else{
      const pedidoformat = {
          estado:"",
          tipoEntrega: pedido.tipoEntrega,
          total: pedido.total,
          fecha: pedido.fecha,
          visitante: usuarioFormateado,
          direccion: pedido.direccion,
          puntoRetiro: pedido.puntoRetiro,
          ronda: pedido.ronda,
          productos: pedido.productos,
      };
      return this.http.put<Pedido>('/rest/pedidos/confirmado', pedidoformat, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
    }
    
  }

  public modificarPedido(pedido: Pedido): Observable<Pedido> {
    this.productosf=[];
    const usuarioFormateado = {
      id: pedido.visitante.id,
      borrado: pedido.visitante.borrado,
      nombre: pedido.visitante.nombre,
      email: pedido.visitante.email,
      contraseña: pedido.visitante.contrasena,
      telefono: pedido.visitante.telefono
    };
    for (let i = 0; i < pedido.productos.length; i++) {
      const productoformat ={
        id: pedido.productos[i].id,
        borrado: pedido.productos[i].borrado,
        precio: pedido.productos[i].precio,
        foto: pedido.productos[i].foto,
        descripcion: pedido.productos[i].descripcion,
        nombre: pedido.productos[i].nombre,
        stock: pedido.productos[i].stock,
        productor: pedido.productos[i].productor
      }
      this.productosf[i]=productoformat;
    }
    const pedidoformat = {
        estado:"",
        tipoEntrega: pedido.tipoEntrega,
        total: pedido.total,
        fecha: pedido.fecha,
        visitante: usuarioFormateado,
        direccion: pedido.direccion,
        puntoRetiro: pedido.puntoRetiro,
        ronda: pedido.ronda,
        productos: this.productosf,
    };
    return this.http.put<Pedido>('/rest/pedidos/modificar', pedidoformat, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  public RepetirPedido(pedido: any): Observable<Pedido> {
    this.productosf=[];
    const usuarioFormateado = {
      id: pedido.visitante.id,
      borrado: pedido.visitante.borrado,
      nombre: pedido.visitante.nombre,
      email: pedido.visitante.email,
      contraseña: pedido.visitante.contrasena,
      telefono: pedido.visitante.telefono
    };
    let cant=0;
    for (let i = 0; i < pedido.productos.length; i++) {
      let x=0;
      for  (x = 0; x < pedido.productos[i].cantidad; x++){
        const productoformat ={
          id: pedido.productos[x].id,
          borrado: pedido.productos[x].borrado,
          precio: pedido.productos[x].precio,
          foto: pedido.productos[x].foto,
          descripcion: pedido.productos[x].descripcion,
          nombre: pedido.productos[x].nombre,
          stock: pedido.productos[x].stock,
          productor: pedido.productos[x].productor
        }
        this.productosf[i*cant+x]=productoformat;
      }
      cant= pedido.productos[i].cantidad;
    }
    const pedidoformat = {
        estado:"",
        tipoEntrega: pedido.tipoEntrega,
        total: pedido.total,
        fecha: pedido.fecha,
        visitante: usuarioFormateado,
        direccion: pedido.direccion,
        puntoRetiro: pedido.puntoRetiro,
        ronda: pedido.ronda,
        productos: this.productosf,
    };
    return this.http.put<Pedido>('/rest/pedidos/repetir', pedidoformat, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  public entregadoPedido(pedido: Pedido): Observable<Pedido> {
    this.productosf=[];
    const usuarioFormateado = {
      id: pedido.visitante.id,
      borrado: pedido.visitante.borrado,
      nombre: pedido.visitante.nombre,
      email: pedido.visitante.email,
      contraseña: pedido.visitante.contrasena,
      telefono: pedido.visitante.telefono
    };
    for (let i = 0; i < pedido.productos.length; i++) {
      const productoformat ={
        id: pedido.productos[i].id,
        borrado: pedido.productos[i].borrado,
        precio: pedido.productos[i].precio,
        foto: pedido.productos[i].foto,
        descripcion: pedido.productos[i].descripcion,
        nombre: pedido.productos[i].nombre,
        stock: pedido.productos[i].stock,
        productor: pedido.productos[i].productor
      }
      this.productosf[i]=productoformat;
    }
    const pedidoformat = {
        estado:"",
        tipoEntrega: pedido.tipoEntrega,
        total: pedido.total,
        fecha: pedido.fecha,
        visitante: usuarioFormateado,
        direccion: pedido.direccion,
        puntoRetiro: pedido.puntoRetiro,
        ronda: pedido.ronda,
        productos: this.productosf,
    };
    return this.http.put<Pedido>('/rest/pedidos/entregado', pedidoformat, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  deletePedido(id:String){
    this.http.delete('/rest/pedidos/'+id)
    .subscribe();
  }
}
