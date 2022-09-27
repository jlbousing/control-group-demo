import { Component, Inject, OnInit } from '@angular/core';
import { IState } from 'src/app/interfaces/IState';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';

interface IDialogData {
  state: IState
}

@Component({
  selector: 'app-view-state-modal',
  templateUrl: './view-state-modal.component.html',
  styleUrls: ['./view-state-modal.component.scss']
})
export class ViewStateModalComponent implements OnInit {

  constructor(
    @Inject(DIALOG_DATA) public data: IDialogData,
    public dialogRef: DialogRef
  ) { }

  ngOnInit(): void {
  }

}
