import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError} from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { iterateJson } from 'src/app/utils/iterateJson';
import { IRol } from 'src/app/interfaces/IRol';
import { handleError } from 'src/app/utils/handleError';

@Injectable({
  providedIn: 'root'
})
export class RolsService {

  constructor(private http: HttpClient) { }

  getRoles(limit: number, offset: number) {

    const url: string = `${environment.api_url}${environment.port}${environment.endpoints.users.roles.list}`;
    const params: string = `?limit=${limit}&offset=${offset}`;

    return this.http.get<IRol>(
      url + params,
      { observe: 'response',
        headers: {
        'apikey': `${environment.apikey}`
      }
    }
    ).pipe(
      retry(3),
      map((response: HttpResponse<any>) => {
        if(response.status === 200){
          return response.body.result;
        }
      })
    );
  }

}
