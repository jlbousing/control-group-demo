import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError} from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { iterateJson } from 'src/app/utils/iterateJson';
import { IAssignament } from 'src/app/interfaces/IAssignament';
import { IAssignamentRequest } from 'src/app/interfaces/IAssignamentRequest';
import { handleError } from 'src/app/utils/handleError';

@Injectable({
  providedIn: 'root'
})
export class AssignamentService {

  constructor(
    private http: HttpClient
  ) { }

  getAssignamentsBySupplier(id: number) {

    const url: string = `${environment.api_url}${environment.port}${environment.endpoints.assignaments.find}`;
    const params: string = `?suppliersId=${id}`;

    return this.http.get<IAssignament[]>(
      url + params,
      { observe: 'response',
        headers: {
        'Authorization': `Bearer ${environment.token}`,
        'apikey': `${environment.apikey}`
        }
      }
    ).pipe(
      retry(3),
      catchError(handleError),
      map((response: HttpResponse<any>) => {
        if(response.status === 200){
          return response.body.result;
        }
      })
    );

  }


}
