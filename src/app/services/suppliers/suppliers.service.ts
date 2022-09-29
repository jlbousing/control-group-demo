import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError} from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { iterateJson } from 'src/app/utils/iterateJson';
import { ISupplier } from 'src/app/interfaces/ISupplier';
import { ISupplierRequest } from 'src/app/interfaces/ISupplierRequest';

@Injectable({
  providedIn: 'root'
})
export class SuppliersService {

  constructor(
    private http: HttpClient
  ) { }

  getSuppliers(category: number,limit: number,offset:number) {

    const url: string = `${environment.api_url}${environment.port}${environment.endpoints.suppliers.list}`;
    const params: string = `?categoryId=${category}&limit=${limit}&offset=${offset}`;

    return this.http.get<ISupplier[]>(
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

  createSupplier(payload: ISupplierRequest) {

    const url: string = `${environment.api_url}${environment.port}${environment.endpoints.suppliers.create}`;

    return this.http.post<ISupplierRequest>(
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
        if(response.status === 201){
          return response.body.result;
        }

        if(response.status === 400){
          return response;
        }
      })
    );
  }

  findSupplierById(id: number) {
    const url: string = `${environment.api_url}${environment.port}${environment.endpoints.suppliers.findById}`;
    const params: string = `?id=${id}&getAsignaments=true`;

    return this.http.get<ISupplier>(
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
