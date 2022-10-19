import { Component, OnInit, Inject } from '@angular/core';
import { Dialog, DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { IAssignament } from 'src/app/interfaces/IAssignament';
import { IStatus } from 'src/app/interfaces/IStatus';
import { ISupplier } from 'src/app/interfaces/ISupplier';
import { IAssigmentPatch } from 'src/app/interfaces/IAssignamentsPatch';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertModalComponent } from '../alert-modal/alert-modal.component';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlerService } from 'src/app/services/errorhandler/errorhandler.service';
import { statusNameColor } from 'src/app/utils/statusNameColor';
import { AssignamentService } from 'src/app/services/assignaments/assignament.service';


interface IDialogData {
  assignment: IAssignament,
  statues: IStatus[],
  suppliers: ISupplier[],
  supplierId: number;
  companyId: number;
}

@Component({
  selector: 'edit-assignments-modal',
  templateUrl: './edit-assignments-modal.component.html',
  styleUrls: ['./edit-assignments-modal.component.scss']
})
export class EditAssignmentsModalComponent implements OnInit {

  form = new FormGroup({
    name: new FormControl<string>(this.data.assignment.name,[
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30)
    ]),
    statusId: new FormControl<number>(this.data.assignment.statusData.id,Validators.required),
    comments: new FormControl<string>(this.data.assignment.comments,[
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(250)
    ])
  });

  constructor(
    @Inject(DIALOG_DATA) public data: IDialogData,
    public dialogRef: DialogRef,
    private assignamentService: AssignamentService,
    private dialog: Dialog,
    private router: Router,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit(): void {

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    console.log(this.data);
  }

  colorStatus() {
    return statusNameColor(this.data.assignment.statusData.status);
  }

  toInt(value: string) {
    return parseInt(value);
  }

  onSubmit() {

    console.log(this.form.value);

    if(this.form.value.name
       && this.form.value.statusId
       && this.form.value.comments) {

        const payload: IAssigmentPatch = {
          name: this.form.value.name,
          //suppliersId: this.form.value.supplierId,
          status: this.form.value.statusId,
          comments: this.form.value.comments
        }

        this.assignamentService.patchAssignaments(payload,this.data.assignment.id)
          .subscribe((response: any) => {
            console.log("probando patch ",response);
            this.dialog.open(AlertModalComponent,{
              data: {
                status: 200,
                message: <string>response.label
              }
            });

            this.dialogRef.close();
            this.router.navigateByUrl('/dashboard/assignaments-list/'+this.data.companyId);
          },(error: HttpErrorResponse) => {
            this.errorHandler.handleError(error);
          })
       }
  }



}
