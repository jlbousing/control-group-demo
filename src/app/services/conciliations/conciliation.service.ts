import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError} from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { iterateJson } from 'src/app/utils/iterateJson';
//import { IConcilation } from 'src/app/interfaces/IConcilation';
import { IConciliationData } from 'src/app/interfaces/IConcilationData';
import { handleError } from 'src/app/utils/handleError';


@Injectable({
  providedIn: 'root'
})
export class ConciliationService {

  constructor(
    private http: HttpClient
  ) { }

  getConciliationInquiryBySupplier(limit: number, offset: number, supplierId: number ,startDate: string, endDate: string) {

    const url: string = `${environment.api_url}${environment.port}${environment.endpoints.conciliations.inquiry.supplier}`;
    const params: string = `?supplierId=${supplierId}&offset=${offset}&limit=${limit}&getProductions=true&getDispatchs=true&getRecipes=true&getSupplier=true&getAsignament=true&startDate=${startDate}&endDate=${endDate}`;

    console.log("conciliacion ",url+params);

    return this.http.get<IConciliationData[]>(
      url + params,
      { observe: 'response',
        headers: {
        'apikey': `${environment.apikey}`
      }
    }
    ).pipe(
      retry(3),
      map((response: HttpResponse<any>) => {
        console.log("probando response ",response);
        if(response.status === 200){
          console.log(response);
          return response.body.result;
        }
      })
    );
  }
}
