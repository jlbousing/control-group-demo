import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError} from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { iterateJson } from 'src/app/utils/iterateJson';
import { IRecipe } from 'src/app/interfaces/IRecipe';
import { IRecipeRequest } from 'src/app/interfaces/IRecipeRequest';
import { IProduction } from 'src/app/interfaces/IProduction';
import { IProductionRequest } from 'src/app/interfaces/IProductionRequest';
import { handleError } from 'src/app/utils/handleError';

@Injectable({
  providedIn: 'root'
})
export class ProductionService {

  constructor(
    private http: HttpClient
  ) { }

  getProductionByRecipe(limit: number, offset: number, recipeId: number) {

    const url: string = `${environment.api_url}${environment.port}${environment.endpoints.productions.list}`;
    const params: string = `?offset=${offset}&limit=${limit}&recipeId=${recipeId}&getConciliation=true&getStatus=true&getRecipes=true`;

    return this.http.get<IProduction[]>(
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

  createProduction(payload: IProductionRequest) {
    const url: string = `${environment.api_url}${environment.port}${environment.endpoints.productions.create}`;

    return this.http.post<IProductionRequest>(
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

  findProduction(id: number) {

    const url: string = `${environment.api_url}${environment.port}${environment.endpoints.productions.find}`;
    const params: string = `?id=${id}&getRecipes=true&getUser=true&getStatus=true&getConciliation=true`;

    return this.http.get<IProduction[]>(
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

  revertProduction(id: number) {

    const url: string = `${environment.api_url}${environment.port}${environment.endpoints.productions.revert}`;

    return this.http.delete<IProduction>(
      url + id,
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
