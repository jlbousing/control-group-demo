import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError} from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { iterateJson } from 'src/app/utils/iterateJson';
import { IItem } from "src/app/interfaces/IItem";
import { IItemRequest } from 'src/app/interfaces/IItemRequest';
import { handleError } from 'src/app/utils/handleError';


@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(
    private http: HttpClient
  ) { }

  getItems(limit: number, offset: number, subcategoryId: number) {
    const url: string = `${environment.api_url}${environment.port}${environment.endpoints.items.list}`;
    const params: string = `?offset=${offset}&limit=${limit}&getInstructions=true&subcategoryId=${subcategoryId}`;

    return this.http.get<IItem[]>(
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

  createItem(payload: IItemRequest) {
    const url: string = `${environment.api_url}${environment.port}${environment.endpoints.items.create}`;

    return this.http.post<IItemRequest>(
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
}
