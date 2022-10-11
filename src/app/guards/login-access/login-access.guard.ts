import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageManager } from 'src/app/utils/StorageManager';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginAccessGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      const userInfo = StorageManager.getFromLocalStorage("userInfo");

    if(userInfo){
      return true;
    }else{
      this.router.navigateByUrl("/login");
    }

    return false;

  }

}
