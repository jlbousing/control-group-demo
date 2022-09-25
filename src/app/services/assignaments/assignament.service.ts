import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError} from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { iterateJson } from 'src/app/utils/iterateJson';
import { IAssignament } from 'src/app/interfaces/IAssignament';
import { IAssignamentRequest } from 'src/app/interfaces/IAssignamentRequest';
import { IAssigmentPatch } from 'src/app/interfaces/IAssignamentsPatch';
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
    const params: string = `?suppliersId=${id}&getRecipesClap=true&getStatus=true&getSupplier=true&getSubcategory=true`;

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

  createAssignaments(payload: IAssignamentRequest) {

    const url: string = `${environment.api_url}${environment.port}${environment.endpoints.assignaments.create}`;

    return this.http.post<IAssignamentRequest>(
      url,
      payload,
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

  patchAssignaments(payload: IAssigmentPatch, id: number) {

    const url: string = `${environment.api_url}${environment.port}${environment.endpoints.assignaments.changes}${id}`;

    return this.http.patch<IAssignamentRequest>(
      url,
      payload,
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
        console.log(response)
        if(response.status === 200){
          return response.body.result;
        }

        if(response.status === 400){
          return response;
        }
      })
    );

  }

  findAssignaents(id: number) {

    const url: string = `${environment.api_url}${environment.port}${environment.endpoints.assignaments.find}`;
    const params: string = `?id=${id}&getRecipesClap=true`;

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

        if(response.status === 404){
          return null;
        }
      })
    );

  }


}
