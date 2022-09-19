import { Component, Inject, OnInit } from '@angular/core';
import { IDispatch } from 'src/app/interfaces/IDispacht';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';

interface IDialogData {
  dispatch: IDispatch
}

@Component({
  selector: 'app-view-dispatch-modal',
  templateUrl: './view-dispatch-modal.component.html',
  styleUrls: ['./view-dispatch-modal.component.scss']
})
export class ViewDispatchModalComponent implements OnInit {

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
