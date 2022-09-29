import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError} from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { iterateJson } from 'src/app/utils/iterateJson';
import { IState } from 'src/app/interfaces/IState';
import { handleError } from 'src/app/utils/handleError';
import { IStateRequest } from 'src/app/interfaces/IStateRequest';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor(
    private http: HttpClient
  ) { }

  getStates(limit: number, offset: number) {

    const url: string = `${environment.api_url}${environment.port}${environment.endpoints.states.list}`;
    const params: string = `?offset=${offset}&limit=${limit}&getMunicipality=true&getParish=true`;

    return this.http.get<IState[]>(
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

  createState(payload: IStateRequest) {
    const url: string = `${environment.api_url}${environment.port}${environment.endpoints.states.create}`;

    return this.http.post<IStateRequest>(
      url,
      payload,
      { observe: 'response',
        headers: {
        'apikey': `${environment.apikey}`
      }
    }
    ).pipe(
      retry(1),
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

  findState(name: string) {
    const url: string = `${environment.api_url}${environment.port}${environment.endpoints.states.find}`;
    const params: string = `?name=${name}&getMunicipality=true&getParish=true`;

    return this.http.get<IState>(
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

  patchState(payload: IStateRequest, id: number) {
    const url: string = `${environment.api_url}${environment.port}${environment.endpoints.states.changes}${id}`;

    return this.http.patch<IStateRequest>(
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
}
