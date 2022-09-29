import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError} from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { iterateJson } from 'src/app/utils/iterateJson';
import { IParish } from 'src/app/interfaces/IParish';
import { handleError } from 'src/app/utils/handleError';
import { IParishRequest } from 'src/app/interfaces/IParishRequest';

@Injectable({
  providedIn: 'root'
})
export class ParishService {

  constructor(
    private http: HttpClient
  ) { }

  getParish(limit: number, offset: number, municipalityId: number) {

    const url: string = `${environment.api_url}${environment.port}${environment.endpoints.parish.list}`;
    const params: string = `?offset=${offset}&limit=${limit}&municipalityId=${municipalityId}&getState=true&getMunicipality=true`;

    return this.http.get<IParish[]>(
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

  createParish(payload: IParishRequest) {
    const url: string = `${environment.api_url}${environment.port}${environment.endpoints.parish.create}`;

    return this.http.post<IParishRequest>(
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

  findParsih(name: string) {
    const url: string = `${environment.api_url}${environment.port}${environment.endpoints.parish.find}`;
    const params: string = `?name=${name}&getMunicipality=true&getState=true`;

    return this.http.get<IParish>(
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

  patchParish(payload: IParishRequest, id: number) {
    const url: string = `${environment.api_url}${environment.port}${environment.endpoints.municipality.changes}${id}`;

    return this.http.patch<IParishRequest>(
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
