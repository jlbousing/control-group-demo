
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageManager } from 'src/app/utils/StorageManager';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(
    private router: Router
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    //const token: string = localStorage.getItem('token');
    const token: string = StorageManager.getFromLocalStorage("token");

    let request = req;

    if (token) {
      request = req.clone({
        setHeaders: {
          authorization: `Bearer ${ token }`
          //authorization: `Bearer ${ environment.token }`
        }
      });
    }else {

      this.router.navigateByUrl("/login");
    }

    return next.handle(request);
  }
}
