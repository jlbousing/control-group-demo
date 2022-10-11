import { Component, OnInit, Inject } from '@angular/core';
import { DialogRef, DIALOG_DATA, Dialog } from '@angular/cdk/dialog';
import { DispachtService } from 'src/app/services/dispatch/dispacht.service';
import { IDispatchPatch } from 'src/app/interfaces/IDispatchPatch';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlerService } from 'src/app/services/errorhandler/errorhandler.service';
import { AlertModalComponent } from '../alert-modal/alert-modal.component';
import { Route, Router } from '@angular/router';
import { IDispatch } from 'src/app/interfaces/IDispacht';
import { statusNameColor } from 'src/app/utils/statusNameColor';
import { ISupplier } from 'src/app/interfaces/ISupplier';

interface IDialogData {
  dispatch: IDispatch;
  supplier: ISupplier
}

@Component({
  selector: 'app-return-dispatch-modal',
  templateUrl: './return-dispatch-modal.component.html',
  styleUrls: ['./return-dispatch-modal.component.scss']
})
export class ReturnDispatchModalComponent implements OnInit {

  activeQuestion: boolean = false;

  constructor(
    @Inject(DIALOG_DATA) public data: IDialogData,
    public dialogRef: DialogRef,
    private dispatchService: DispachtService,
    private errorHanlder: ErrorHandlerService,
    private dialog: Dialog,
    private errorHandler: ErrorHandlerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  onCloseModal(){
    this.dialogRef.close();
  }

  setActiveQuestion() {
    this.activeQuestion = true;
  }

  colorStatus() {
    return statusNameColor(this.data.dispatch.statusData.status);
  }

  changeStatus(id: number) {

    const payload: IDispatchPatch = {
      status: 14
    };

    this.dispatchService.changeStatus(payload,this.data.dispatch.id)
      .subscribe((response: any) => {
        console.log(response);
        this.dialog.open(AlertModalComponent,{
          data: {
            status: 200,
            message: <string>response.label
          }
        });

        this.dialogRef.close();
        this.router.navigateByUrl("/providers/dispatch/"+this.data.supplier.id);
      },(error: HttpErrorResponse) => {
        this.errorHandler.handleError(error);
      });

  }

}
