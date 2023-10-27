import { Injectable, inject } from "@angular/core";
import { Visitante } from "./visitante";
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { CookieService } from "ngx-cookie-service";

const httpOptions = {
    headers: new HttpHeaders({
    'Content-Type': 'application/json',
    })
   };

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    constructor(private http: HttpClient, private router: Router, private cookies: CookieService) { 
      this.verificarSesion();
    }

    private handleError(error: HttpErrorResponse) {
        if (error.status == 404){
          console.error('Email no encontrado', error.error);
        }
        if (error.status == 401){
          console.error('Contraseña incorrecta', error.error);
          this.router.navigate(['/Login']);
        }
        return throwError(() => error);
      }

    public login(visitante: Visitante): Observable<any>{
        const usuarioFormateado = {
          nombre: visitante.nombre,
          email: visitante.email,
          contraseña: visitante.contrasena,
          telefono: visitante.telefono
        };
        return this.http.post<Visitante>('/rest/auth', usuarioFormateado, httpOptions)
        .pipe(
          catchError(this.handleError)
        );
      }

      datosDeSession: BehaviorSubject<any> = new BehaviorSubject<any>({logged: false, rol: "loguear", id:0});

      verificarSesion(){
        if(this.activa()){
          const nuevo = {
            logged: true,
            rol: this.cookies.get("rol"),
            id: this.cookies.get("id")
          }
          this.datosDeSession.next(nuevo);
        }
      }

      establecerSesion(token: string, rol: string, id: number){
        this.cookies.set('token', token, 1, '/');
        this.cookies.set('rol', rol, 1, '/');
        this.cookies.set('id', id.toString(), 1, '/');
        const nuevo = {
          logged: true,
          rol: rol,
          id:id
        };
        this.datosDeSession.next(nuevo);
      }

      cerrarSesion(){
        this.cookies.delete("token");
        this.cookies.delete("rol");
        this.cookies.delete("id");
        this.datosDeSession.next({logged: false, rol: "loguear", id:0});
        this.router.navigate(['/Login']);
      }
      
      obtenerDatosDeSesion(){
        return this.datosDeSession.asObservable();
      }
        
      getToken() {
        if(this.cookies.check("token")){
          return this.cookies.get("token");
        }else{
          return null;
        }
      }

      getRol(): string{
        if(this.cookies.check("rol")){
          return this.cookies.get("rol");
        }else{
          return "loguear";
        }
      }

      getId(): number{
        if(this.cookies.check("id")){
          return Number(this.cookies.get("id"));
        }else{
          return 0;
        }
      }

      activa(): boolean{
        if(this.cookies.check("token"))return true;
        else return false;
      }
}