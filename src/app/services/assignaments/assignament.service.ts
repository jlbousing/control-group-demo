import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError} from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { iterateJson } from 'src/app/utils/iterateJson';
import { IAssignament } from 'src/app/interfaces/IAssignament';
import { IAssignamentRequest } from 'src/app/interfaces/IAssignamentRequest';
import { IAssigmentPatch } from 'src/app/interfaces/IAssignamentsPatch';
import { StorageManager } from 'src/app/utils/StorageManager';

@Injectable({
  providedIn: 'root'
})
export class AssignamentService {

  constructor(
    private http: HttpClient
  ) { }

  getAssignaments(offset: number, limit: number) {

    const url: string = `${environment.api_url}${environment.port}${environment.endpoints.assignaments.list}`;
    const params: string = `?offset=${offset}&limit=${limit}`;

    return this.http.get<IAssignament[]>(
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

  getAssignamentsByCompany(id: number) {

    const url: string = `${environment.api_url}${environment.port}${environment.endpoints.assignaments.find}`;
    const params: string = `?companyId=${id}&getRecipesClap=true&getStatus=true&getSubcategory=true`;

    return this.http.get<IAssignament[]>(
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

  getAssignamentsByDates(subCategoryId: number,startDate: string, endDate: string,limit: number, offset: number) {

    const url: string = `${environment.api_url}${environment.port}${environment.endpoints.assignaments.list}`;
    const params: string = `?subcategoryId=${subCategoryId}&startDate=${startDate}&endDate=${endDate}&limit=${limit}&offset=${offset}&getRecipesClap=true&getStatus=true&getSubcategory=true`;

    return this.http.get<IAssignament[]>(
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

  createAssignaments(payload: IAssignamentRequest) {

    const url: string = `${environment.api_url}${environment.port}${environment.endpoints.assignaments.create}`;

    return this.http.post<IAssignamentRequest>(
      url,
      payload,
      { observe: 'response',
        headers: {
        'apikey': `${environment.apikey}`
      }
    }
    ).pipe(
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
        'apikey': `${environment.apikey}`
      }
    }
    ).pipe(
      retry(3),
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
    const params: string = `?id=${id}&getRecipesClap=true&getSubcategory=true`;

    return this.http.get<IAssignament[]>(
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

        if(response.status === 404){
          return null;
        }
      })
    );

  }


}
