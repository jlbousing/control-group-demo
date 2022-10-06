import { Component, OnInit, Inject } from '@angular/core';
import { IProduction } from 'src/app/interfaces/IProduction';
import { ProductionService } from 'src/app/services/production/production.service';
import { ErrorHandlerService } from 'src/app/services/errorhandler/errorhandler.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertModalComponent } from '../alert-modal/alert-modal.component';
import { DialogRef, DIALOG_DATA, Dialog } from '@angular/cdk/dialog';

interface IDialogData {
  production: IProduction
}

@Component({
  selector: 'app-remake-production-modal',
  templateUrl: './remake-production-modal.component.html',
  styleUrls: ['./remake-production-modal.component.scss']
})
export class RemakeProductionModalComponent implements OnInit {

  activeQuestion: boolean = false;

  constructor(
    @Inject(DIALOG_DATA) public data: IDialogData,
    public dialogRef: DialogRef,
    private productionService: ProductionService,
    private errorHandler: ErrorHandlerService,
    private dialog: Dialog
  ) { }

  ngOnInit(): void {
  }

  setActiveQuestion() {
    this.activeQuestion = true;
  }

  revert(id: number) {

    this.productionService.revertProduction(id)
      .subscribe((response: any) => {
        this.dialog.open(AlertModalComponent,{
          data: {
            status: 200,
            message: <string>response.label
          }
        });
      },(error: HttpErrorResponse) => {
        this.errorHandler.handleError(error);
      });

  }

}
