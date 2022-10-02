import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { AlertModalComponent
 } from 'src/app/components/modals/alert-modal/alert-modal.component';
 import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  public errorMessage: string = '';

  constructor(
    private dialog: Dialog,
    private router: Router
  ) { }

  public handleError = (error: HttpErrorResponse) => {

    console.log("entrando aqui ",error);

    if (error.status === 500) {
      //this.handle500Error(error);
      this.dialog.open(AlertModalComponent,{
        data: {
          status: 500,
          message: "Ha ocurrido un problema con el servidor, intente otra vez"
        }
      });
    }
    else if (error.status === 404) {
      //this.handle500Error(error);
      console.log("hey, not found ",error);
      /*this.dialog.open(AlertModalComponent,{
        data: {
          status: error.status,
          message: <string>error.error.result.message
        }
      }); */
    }
    else if (error.status === 401) {
      //this.handle500Error(error);
      //console.log("hey, not found ",error);
      this.dialog.open(AlertModalComponent,{
        data: {
          status: error.status,
          message: <string>error.error
        }
      });

      this.router.navigateByUrl("/login");
    }
    else {
      console.log(error.error.result.message);
      this.dialog.open(AlertModalComponent,{
        data: {
          status: error.status,
          message: <string>error.error.result.message
        }
      });
    }

  }

  private handle500Error = (error: HttpErrorResponse) => {

    this.createErrorMessage(error);
    console.log(error);
  }

  private handle404Error = (error: HttpErrorResponse) => {
    this.createErrorMessage(error);
    console.log("sdasdadasdasdasd");
  }

  private handleOtherError = (error: HttpErrorResponse) => {
    this.createErrorMessage(error); //TODO: this will be fixed later;
  }
  private createErrorMessage = (error: HttpErrorResponse) => {
    this.errorMessage = error.error ? error.error : error.statusText;
  }

}
