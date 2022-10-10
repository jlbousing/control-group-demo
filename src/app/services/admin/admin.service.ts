import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError} from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { iterateJson } from 'src/app/utils/iterateJson';
import { IRecovery } from 'src/app/interfaces/IRecovery';
import { handleError } from 'src/app/utils/handleError';
import { StorageManager } from 'src/app/utils/StorageManager';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private http: HttpClient
  ) { }

  recovery(payload: IRecovery) {

    const url: string = `${environment.api_url}${environment.port}${environment.endpoints.admin.recovery}`;

    return this.http.post<IRecovery>(
      url,
      payload,
      { observe: 'response',
        headers: {
        'apikey': `${environment.apikey}`
      }
    }
    ).pipe(
      catchError(handleError),
      map((response: HttpResponse<any>) => {
        console.log(response)
        if(response.status === 201){
          return response.body.result;
        }

        if(response.status === 400){
          return response;
        }
      })
    );
  }

  reset(token: string) {

    const url: string = `${environment.api_url}${environment.port}${environment.endpoints.admin.recovery}`;
    const params = `?token=${token}`;

    let payload = {};

    return this.http.post<IRecovery>(
      url + token,
      payload,
      { observe: 'response',
        headers: {
        'apikey': `${environment.apikey}`
      }
    }
    ).pipe(
      catchError(handleError),
      map((response: HttpResponse<any>) => {
        console.log(response)
        if(response.status === 201){
          return response.body.result;
        }

        if(response.status === 400){
          return response;
        }
      })
    );
  }
}
