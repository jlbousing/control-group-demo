import { Component, OnInit, Input, Output } from '@angular/core';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { IAssignament } from 'src/app/interfaces/IAssignament';
import { IStatus } from 'src/app/interfaces/IStatus';
import { ISupplier } from 'src/app/interfaces/ISupplier';
import { IAssigmentPatch } from 'src/app/interfaces/IAssignamentsPatch';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AssignamentService } from 'src/app/services/assignaments/assignament.service';
import { Inject } from '@angular/core';

interface IDialogData {
  assignment: IAssignament,
  statues: IStatus[],
  suppliers: ISupplier[]
}

@Component({
  selector: 'edit-assignments-modal',
  templateUrl: './edit-assignments-modal.component.html',
  styleUrls: ['./edit-assignments-modal.component.scss']
})
export class EditAssignmentsModalComponent implements OnInit {

  form = new FormGroup({
    name: new FormControl<string>(this.data.assignment.name,Validators.required),
    statusId: new FormControl<number>(this.data.assignment.statusData.id,Validators.required),
    supplierId: new FormControl<number>(this.data.assignment.supplierData.id,Validators.required),
    comments: new FormControl<string>(this.data.assignment.comments,Validators.required)
  });

  constructor(
    @Inject(DIALOG_DATA) public data: IDialogData,
    public dialogRef: DialogRef,
    private assignamentService: AssignamentService
  ) { }

  ngOnInit(): void {

    console.log("hey uya ",this.data.assignment)
  }

  onSubmit() {

    console.log(this.form.value);

    if(this.form.value.name
       && this.form.value.statusId
       && this.form.value.supplierId
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
            alert(response.label);
          })
       }
  }



}
