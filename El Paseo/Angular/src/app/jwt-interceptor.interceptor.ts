import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginService } from './modelos/login.service';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptorInterceptor implements HttpInterceptor {

  constructor(private loginService:LoginService, private router:Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.loginService.getToken();
    if(token!=null){
      const authReq = request.clone({headers: request.headers.set('Authorization', token)}); 
      return next.handle(authReq).pipe(
        tap(
          (event: HttpEvent<any>) => {},
          (error: any) => {
            if (error.status === 401) {
              this.router.navigate(['/Login']);// ver error de autentificacion para que lleve al login 
            }
          }
        )
      );
    }else{
      return next.handle(request);
    }
  }
}
