import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError} from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { iterateJson } from 'src/app/utils/iterateJson';
import { IRecipe } from 'src/app/interfaces/IRecipe';
import { IRecipeRequest } from 'src/app/interfaces/IRecipeRequest';
import { IRecipePatch } from 'src/app/interfaces/IRecipePatch';
import { handleError } from 'src/app/utils/handleError';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  constructor(
    private http: HttpClient
  ) { }

  getRecipes(limit: number, offset: number, asignamentId: number) {

    const url: string = `${environment.api_url}${environment.port}${environment.endpoints.recipes.list}`;
    const params: string = `?offset=${offset}&limit=${limit}&asignamentId=${asignamentId}`;

    return this.http.get<IRecipe[]>(
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

  createRecipe(payload: IRecipeRequest) {
    const url: string = `${environment.api_url}${environment.port}${environment.endpoints.recipes.create}`;

    return this.http.post<IRecipeRequest>(
      url,
      payload,
      { observe: 'response',
        headers: {
        'Authorization': `Bearer ${environment.token}`,
        'apikey': `${environment.apikey}`
      }
    }
    ).pipe(
      retry(1),
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

  findRecipe(id: number) {
    const url: string = `${environment.api_url}${environment.port}${environment.endpoints.recipes.find}`;
    const params: string = `f?recipeId=${id}&getProducts=true`;

    return this.http.get<IRecipe>(
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

  patchRecipe(payload: IRecipePatch, id: number) {
    const url: string = `${environment.api_url}${environment.port}${environment.endpoints.instructions}${id}`;

    return this.http.patch<IRecipePatch>(
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
