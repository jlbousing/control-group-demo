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
export class StateService {

  constructor() { }
}
