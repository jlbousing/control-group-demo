import { Component, OnInit, Inject } from '@angular/core';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { IMunicipality } from 'src/app/interfaces/IMunicipality';

interface IDialogData {
  municipality: IMunicipality
}

@Component({
  selector: 'app-view-municipality-modal',
  templateUrl: './view-municipality-modal.component.html',
  styleUrls: ['./view-municipality-modal.component.scss']
})
export class ViewMunicipalityModalComponent implements OnInit {

  constructor(
    @Inject(DIALOG_DATA) public data: IDialogData,
    public dialogRef: DialogRef
  ) { }

  ngOnInit(): void {
  }

}
