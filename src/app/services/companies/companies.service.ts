import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ICompany } from 'src/app/interfaces/ICompanies';
import { ICompanyRequest } from 'src/app/interfaces/ICompanyRequest';
import { environment } from 'src/environments/environment';
import { Observable, throwError} from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { iterateJson } from 'src/app/utils/iterateJson';
import { ErrorHandlerService } from '../errorhandler/errorhandler.service';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  constructor(private http: HttpClient,
              private errorHandler: ErrorHandlerService) { }

  getCompanies(limit: number, offset: number) {

    const url: string = `${environment.api_url}${environment.port}${environment.endpoints.companies.list}`;
    const params: string = `?limit=${limit}&offset=${offset}&getSuppliers=true`;

    return this.http.get<ICompany[]>(
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

  createCompanie(payload: ICompanyRequest) {

    const url: string = `${environment.api_url}${environment.port}${environment.endpoints.companies.create}`;

    return this.http.post<ICompanyRequest>(
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

  findCompany(name: string | null,rif: string | null) {

    const url: string = `${environment.api_url}${environment.port}${environment.endpoints.companies.find}`;

    let params: string = "";

    if(rif) {
      params = `?rif=${rif}&getSuppliers=true`;
    }else if(name){
      params = `?name=${name}&getSuppliers=true`;
    }

    return this.http.get<ICompany[]>(
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
