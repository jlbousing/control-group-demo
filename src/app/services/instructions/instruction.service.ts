import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError} from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { iterateJson } from 'src/app/utils/iterateJson';
import { IInstructionRequest } from 'src/app/interfaces/IInstuctionRequest';
import { handleError } from 'src/app/utils/handleError';

@Injectable({
  providedIn: 'root'
})
export class InstructionService {

  constructor(
    private http: HttpClient
  ) { }

  createInstruction(payload: FormData) {
    console.log("entrando en function")
    const url: string = `${environment.api_url}${environment.port}${environment.endpoints.instructions.create_group}`;

    return this.http.post<FormData>(
      url,
      payload,
      { observe: 'response',
        headers: {
        'apikey': `${environment.apikey}`,
        'Accept': 'multipart/form-data'
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
}
