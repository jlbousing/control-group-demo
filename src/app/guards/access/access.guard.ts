import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AccessService } from 'src/app/services/access/access.service';

@Injectable({
  providedIn: 'root'
})
export class AccessGuard implements CanActivate {

  constructor(private accessService: AccessService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.accessService.canCreate();
  }

}
