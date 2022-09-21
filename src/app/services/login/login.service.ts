import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ILogin } from 'src/app/interfaces/Ilogin';
import { environment } from 'src/environments/environment';
import { Observable, throwError} from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { iterateJson } from 'src/app/utils/iterateJson';
import { handleError } from 'src/app/utils/handleError';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient
  ) { }

  login(payload: ILogin) {

    const url = `${environment.api_url}${environment.endpoints.login}`

    return this.http.post<ILogin>(
      url,
      payload,
      {observe: 'response'}
    ).pipe(
      retry(3),
      catchError(handleError),
      map((response: any) => {
        console.log("login response ",response);
        if(response.status === 200){
          return response.body.result;
        }
      })
    );
  }
}
