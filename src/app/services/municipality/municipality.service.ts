import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError} from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { iterateJson } from 'src/app/utils/iterateJson';
import { IMunicipality } from 'src/app/interfaces/IMunicipality';
import { handleError } from 'src/app/utils/handleError';
import { IStateRequest } from 'src/app/interfaces/IStateRequest';
import { IMunicipalityRequest } from 'src/app/interfaces/IMunicipalityRequest';

@Injectable({
  providedIn: 'root'
})
export class MunicipalityService {

  constructor(
    private http: HttpClient
  ) { }

  getMunicipality(limit: number, offset: number, stateId: number) {

    const url: string = `${environment.api_url}${environment.port}${environment.endpoints.municipality.list}`;
    const params: string = `?offset=${offset}&limit=${limit}&statesId=${stateId}&getParish=true&getState=true`;

    return this.http.get<IMunicipality[]>(
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

  createMunicipality(payload: IMunicipalityRequest) {
    const url: string = `${environment.api_url}${environment.port}${environment.endpoints.municipality.create}`;

    return this.http.post<IMunicipalityRequest>(
      url,
      payload,
      { observe: 'response',
        headers: {
        'Authorization': `Bearer ${environment.token}`,
        'apikey': `${environment.apikey}`
      }
    }
    ).pipe(
      retry(1),
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

  findMunicipality(name: string) {
    const url: string = `${environment.api_url}${environment.port}${environment.endpoints.municipality.find}`;
    const params: string = `?name=${name}&getParish=true&getState=true`;

    return this.http.get<IMunicipality>(
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

  patchMunicipality(payload: IMunicipalityRequest, id: number) {
    const url: string = `${environment.api_url}${environment.port}${environment.endpoints.municipality.changes}${id}`;

    return this.http.patch<IMunicipalityRequest>(
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
}
