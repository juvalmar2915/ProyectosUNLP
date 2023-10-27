import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../modelos/login.service';

@Injectable({
 providedIn: 'root'
})
export class AuthGuard implements CanActivate {

constructor(private router: Router, private loginService:LoginService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = this.loginService.getToken();
    if(token==null){
      this.router.navigate(['/Login']);
      return false;
    }else{
      return true;
    }  
    }
  }