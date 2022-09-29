import { Component, OnInit, Inject } from '@angular/core';
import { DialogRef, DIALOG_DATA, Dialog } from '@angular/cdk/dialog';
import { DispachtService } from 'src/app/services/dispatch/dispacht.service';
import { IDispatchPatch } from 'src/app/interfaces/IDispatchPatch';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlerService } from 'src/app/services/errorhandler/errorhandler.service';
import { AlertModalComponent } from '../alert-modal/alert-modal.component';
import { Router } from '@angular/router';
import { IDispatch } from 'src/app/interfaces/IDispacht';
import { ISupplier } from 'src/app/interfaces/ISupplier';

interface IDialogData {
  dispatch: IDispatch,
  supplier: ISupplier
}

@Component({
  selector: 'edit-dispatch-modal',
  templateUrl: './edit-dispatch-modal.component.html',
  styleUrls: ['./edit-dispatch-modal.component.scss']
})
export class EditDispatchModalComponent implements OnInit {

  constructor(
    @Inject(DIALOG_DATA) public data: IDialogData,
    public dialogRef: DialogRef,
    private dispatchService: DispachtService,
    private errorHandler: ErrorHandlerService,
    private dialog: Dialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  onCloseModal(){
    this.dialogRef.close();
  }

  changeStatus(id: number) {

    const payload: IDispatchPatch = {
      status: 10
    };

    this.dispatchService.changeStatus(payload,this.data.dispatch.id)
      .subscribe((response: any) => {
        this.dialog.open(AlertModalComponent, {
          data: {
            status: 200,
            message: <string>response.label
          }
        });
      },(error: HttpErrorResponse) => {
        this.errorHandler.handleError(error);
      });

      this.router.navigateByUrl("/providers/dispatch/"+this.data.supplier.id);

      this.dialogRef.close();

  }

}
