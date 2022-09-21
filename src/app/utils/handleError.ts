import { HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";

export const handleError = (error: HttpErrorResponse) => {
  if (error.status === 0) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('Ha ocurrido un error:', error.error);
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong.
    console.error(
      `Servidor ha retornado codigo ${error.status}, el mensaje es: `, error.error);

    //const message = iterateJson(error.message);
    const message = error.error.result.exception;
    console.log(message);

    //this.presentAlert("Error al registrar informacion de paciente",message);
    alert(message);

  }
  // Return an observable with a user-facing error message.
  return throwError(() => new Error('Algo malo ha ocurrido. Intente luego.'));
}
