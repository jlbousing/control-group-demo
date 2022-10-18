import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError} from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { iterateJson } from 'src/app/utils/iterateJson';
import { ITemplate } from 'src/app/interfaces/ITemplate';
import { ITemplateRequest } from 'src/app/interfaces/ITemplateRequest';
import { handleError } from 'src/app/utils/handleError';
import { ITemplatePatch } from 'src/app/interfaces/ITemplatePatch';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  constructor(
    private http: HttpClient
  ) { }

  getTemplates() {

    const url: string = `${environment.api_url}${environment.port}${environment.endpoints.recipes.templates.list}`;
    const params: string = `?status=true`;

    return this.http.get<ITemplate[]>(
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

  createTemplate(payload: ITemplateRequest) {
    const url: string = `${environment.api_url}${environment.port}${environment.endpoints.recipes.templates.create}`;

    return this.http.post<ITemplateRequest>(
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

  findTemplate(id: number) {
    const url: string = `${environment.api_url}${environment.port}${environment.endpoints.recipes.templates.find}`;
    const params: string = `?id=${id}`;

    return this.http.get<ITemplate>(
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

  patchTemplate(payload: ITemplatePatch, id: number) {

    const url: string = `${environment.api_url}${environment.port}${environment.endpoints.recipes.templates.change}`;

    return this.http.patch<ITemplateRequest>(
      url + id,
      payload,
      { observe: 'response',
        headers: {
        'apikey': `${environment.apikey}`
      }
    }
    ).pipe(
      retry(1),
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
