import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError} from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { iterateJson } from 'src/app/utils/iterateJson';
import { IDispatch } from 'src/app/interfaces/IDispacht';
import { IDispatchRequest } from 'src/app/interfaces/IDispatchRequest';
import { IDispatchPatch } from 'src/app/interfaces/IDispatchPatch';
import { handleError } from 'src/app/utils/handleError';

@Injectable({
  providedIn: 'root'
})
export class DispachtService {

  constructor(
    private http: HttpClient
  ) { }

  getDispatchsByProductionId(limit: number, offset: number, productionId: number) {

    const url: string = `${environment.api_url}${environment.port}${environment.endpoints.dispatch.list}`;
    const params: string = `?offset=${offset}&limit=${limit}&productionId=${productionId}&getProductions=true&getUser=true&getStatus=true`;

    return this.http.get<IDispatch[]>(
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

  createProduction(payload: FormData) {
    const url: string = `${environment.api_url}${environment.port}${environment.endpoints.dispatch.create}`;

    return this.http.post<FormData>(
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

  changeStatus(payload: IDispatchPatch, id: number) {

    const url: string = `${environment.api_url}${environment.port}${environment.endpoints.dispatch.changes}`;

    return this.http.patch<IDispatchPatch>(
      url + id,
      payload,
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

  getImage(img: string) {

    const url: string = `${environment.api_url}${environment.port}${environment.endpoints.dispatch.image}`;
    const params: string = `/${img}`;

    return this.http.get(url + params, {
      responseType: "blob",
      headers: {
        'apikey': `${environment.apikey}`
      }
    })
  }
}
