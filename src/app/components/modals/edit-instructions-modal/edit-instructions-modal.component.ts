import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { IRecipe } from 'src/app/interfaces/IRecipe';

interface IDialogData {
  instruction: IRecipe
}

@Component({
  selector: 'edit-instructions-modal',
  templateUrl: './edit-instructions-modal.component.html',
  styleUrls: ['./edit-instructions-modal.component.scss']
})
export class EditInstructionsModalComponent implements OnInit {

  @Input('showModal') showModal: boolean = false;
  @Output() emiterModal = new EventEmitter<boolean>();

  constructor(
    @Inject(DIALOG_DATA) public data: IDialogData,
    public dialogRef: DialogRef
    ) { }

  ngOnInit(): void {
  }

  onCloseModal(){
    this.emiterModal.emit(true);
  }

}
