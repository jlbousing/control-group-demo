import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError} from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { iterateJson } from 'src/app/utils/iterateJson';
import { IRubro } from 'src/app/interfaces/IRubro';
import { IItem } from "src/app/interfaces/IItem";
import { IItemPatch } from 'src/app/interfaces/IItemPatch';
import { IItemRequest } from 'src/app/interfaces/IItemRequest';
import { handleError } from 'src/app/utils/handleError';
import { IRubroRequest } from 'src/app/interfaces/IRubroRequest';
import { IRubroPatch } from 'src/app/interfaces/IRubroPatch';


@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(
    private http: HttpClient
  ) { }

  getRubros(limit: number, offset: number) {

    const url: string = `${environment.api_url}${environment.port}${environment.endpoints.items.list}`;
    const params: string = `?offset=${offset}&limit=${limit}&getInstructions=true&subcategoryId=1`;

    return this.http.get<IRubro[]>(
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

  createRubro(payload: IRubroRequest) {
    const url: string = `${environment.api_url}${environment.port}${environment.endpoints.items.create}`;

    return this.http.post<IRubroRequest>(
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

  getItems(limit: number, offset: number, subcategoryId: number) {
    const url: string = `${environment.api_url}${environment.port}${environment.endpoints.items.list}`;
    const params: string = `?offset=${offset}&limit=${limit}&getInstructions=true&subcategoryId=${subcategoryId}`;

    return this.http.get<IItem[]>(
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

  createItem(payload: IItemRequest) {
    const url: string = `${environment.api_url}${environment.port}${environment.endpoints.items.createType}`;

    return this.http.post<IItemRequest>(
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

  changeItem(payload: IItemPatch, id: number) {

    const url: string = `${environment.api_url}${environment.port}${environment.endpoints.items.changes}`;

    return this.http.patch<IItemPatch>(
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

  findItems(subcategoryId: number, name: string) {

    const url: string = `${environment.api_url}${environment.port}${environment.endpoints.items.find}`;
    const params: string = `?name=${name}&subcategoryId=${subcategoryId}&getInstructions=true`;

    return this.http.get<IItem>(
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

  getItemTypeByRubro(id: number) {

    const url: string = `${environment.api_url}${environment.port}${environment.endpoints.items.listType}`;
    const params = `?itemId=${id}&getProduct=true`;

    return this.http.get<IItem[]>(
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

  patchRubro(payload: IRubroPatch, id: number) {

    const url: string = `${environment.api_url}${environment.port}${environment.endpoints.items.changes}${id}`;

    return this.http.patch<IRubroPatch>(
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
