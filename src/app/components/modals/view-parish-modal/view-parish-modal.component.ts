import { Component, OnInit, Inject } from '@angular/core';
import { DialogRef, Dialog, DIALOG_DATA } from '@angular/cdk/dialog';
import { IParish } from 'src/app/interfaces/IParish';
import { IState } from 'src/app/interfaces/IState';
import { IMunicipality } from 'src/app/interfaces/IMunicipality';

interface IDialogData {
  parish: IParish;
  municipalities: IMunicipality[]
  states: IState[];
}

@Component({
  selector: 'app-view-parish-modal',
  templateUrl: './view-parish-modal.component.html',
  styleUrls: ['./view-parish-modal.component.scss']
})
export class ViewParishModalComponent implements OnInit {

  constructor(
    @Inject(DIALOG_DATA) public data: IDialogData,
    public dialogRef: DialogRef
  ) { }

  ngOnInit(): void {
  }

}
