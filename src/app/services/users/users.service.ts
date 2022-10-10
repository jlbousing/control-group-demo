import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError} from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { iterateJson } from 'src/app/utils/iterateJson';
import { IUser } from 'src/app/interfaces/user.model';
import { IUserPatch } from 'src/app/interfaces/IUserPatch';
import { handleError } from 'src/app/utils/handleError';
import { IUserRequest } from 'src/app/interfaces/IUserRequest';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient
  ) { }

  getUsers(limit: number, offset: number) {

    const url: string = `${environment.api_url}${environment.port}${environment.endpoints.users.list}`;
    const params: string = `?limit=${limit}&offset=${offset}`;

    return this.http.get<any>(
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

  createUser(payload: IUserRequest) {

    const url: string = `${environment.api_url}${environment.port}${environment.endpoints.users.create}`;

    return this.http.post<IUserRequest>(
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
      }
    ));
  }

  patchUser(payload: IUserPatch, id: number) {

    const url: string = `${environment.api_url}${environment.port}${environment.endpoints.users.changes}${id}`;

    return this.http.patch<IUserPatch>(
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

  findUsers(dni: string) {

    const url: string = `${environment.api_url}${environment.port}${environment.endpoints.users.find}`;
    const params: string = `?dni=${dni}`;

    return this.http.get<any>(
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
