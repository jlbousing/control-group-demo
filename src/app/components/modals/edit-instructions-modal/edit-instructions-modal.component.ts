import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { IStatus } from 'src/app/interfaces/IStatus';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IRecipe } from 'src/app/interfaces/IRecipe';

interface IDialogData {
  instruction: IRecipe;
  statues: IStatus[];
}

@Component({
  selector: 'edit-instructions-modal',
  templateUrl: './edit-instructions-modal.component.html',
  styleUrls: ['./edit-instructions-modal.component.scss']
})
export class EditInstructionsModalComponent implements OnInit {

  constructor(
    @Inject(DIALOG_DATA) public data: IDialogData,
    public dialogRef: DialogRef
    ) { }

  ngOnInit(): void {
  }

  onCloseModal(){
    this.dialogRef.close();
  }

}
