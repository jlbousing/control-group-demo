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
import { handleError } from 'src/app/utils/handleError';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(
    private http: HttpClient
  ) { }


  getCategories() {

    const url: string = `${environment.api_url}${environment.port}${environment.endpoints.categories.list}`;

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
      catchError(handleError),
      map((response: HttpResponse<any>) => {
        if(response.status === 200){
          return response.body.result;
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
      catchError(handleError),
      map((response: HttpResponse<any>) => {
        if(response.status === 200){
          return response.body.result;
        }
      })
    );

  }
}
