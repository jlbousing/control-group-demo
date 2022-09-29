import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError} from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { iterateJson } from 'src/app/utils/iterateJson';
import { ICategory } from 'src/app/interfaces/ICategory';
import { ICategoyRequest } from 'src/app/interfaces/ICategoryRequest';
import { ISubcategory } from 'src/app/interfaces/ISubcategory';
import { ISubcategoryRequest } from 'src/app/interfaces/ISubcategoryRequest';
import { ISubcategoryPatch } from 'src/app/interfaces/ISubcategoryPatch';
import { handleError } from 'src/app/utils/handleError';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(
    private http: HttpClient
  ) { }


  getCategories(limit: number, offset: number) {

    const url: string = `${environment.api_url}${environment.port}${environment.endpoints.categories.list}`;
    const params = `?limit=${limit}&offset=${offset}`;

    return this.http.get<ICategory[]>(
      url,
      { observe: 'response',
        headers: {
        'Authorization': `Bearer ${environment.token}`,
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

  createCategory(payload: ICategoyRequest) {

    const url: string = `${environment.api_url}${environment.port}${environment.endpoints.categories.create}`;

    return this.http.post<ICategoyRequest>(
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

  getSubcategoryByCategoryId(categoryId: number) {

    const url: string = `${environment.api_url}${environment.port}${environment.endpoints.categories.subcategories.list}`;
    const params: string = `?categoryId=${categoryId}`;


    return this.http.get<ISubcategory[]>(
      url + params,
      { observe: 'response',
        headers: {
        'Authorization': `Bearer ${environment.token}`,
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

  patchSubcategory(payload: ISubcategoryPatch, id: number) {

    const url: string = `${environment.api_url}${environment.port}${environment.endpoints.categories.subcategories.changes}${id}`;

    return this.http.patch<ISubcategoryPatch>(
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
      map((response: HttpResponse<any>) => {
        if(response.status === 200){
          return response.body.result;
        }

        if(response.status === 400){
          return response;
        }
      })
    )
  }

  findSubcategory(id: number) {

    const url: string = `${environment.api_url}${environment.port}${environment.endpoints.categories.subcategories.find}`;
    const params: string = `?id=${id}`;

    return this.http.get<ISubcategory>(
      url + params,
      { observe: 'response',
        headers: {
        'Authorization': `Bearer ${environment.token}`,
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

  patchCategory(payload: ICategoyRequest, id: number) {

    const url: string = `${environment.api_url}${environment.port}${environment.endpoints.categories.changes}${id}`;

    return this.http.patch<ISubcategoryPatch>(
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
      map((response: HttpResponse<any>) => {
        if(response.status === 200){
          return response.body.result;
        }

        if(response.status === 400){
          return response;
        }
      })
    )
  }
}
