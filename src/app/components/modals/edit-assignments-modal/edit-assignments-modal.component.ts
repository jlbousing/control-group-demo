import { Component, OnInit, Input, Output } from '@angular/core';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { IAssignament } from 'src/app/interfaces/IAssignament';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Inject } from '@angular/core';

interface IDialogData {
  assignment: IAssignament
}

@Component({
  selector: 'edit-assignments-modal',
  templateUrl: './edit-assignments-modal.component.html',
  styleUrls: ['./edit-assignments-modal.component.scss']
})
export class EditAssignmentsModalComponent implements OnInit {

  constructor(
    @Inject(DIALOG_DATA) public data: IDialogData,
    public dialogRef: DialogRef
  ) { }

  ngOnInit(): void {

    console.log("hey uya ",this.data.assignment)
  }



}
