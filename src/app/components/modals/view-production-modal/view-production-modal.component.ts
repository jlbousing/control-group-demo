import { Component, Inject, OnInit } from '@angular/core';
import { IProduction } from 'src/app/interfaces/IProduction';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';

interface IDialogData {
  production: IProduction
}

@Component({
  selector: 'view-production-modal',
  templateUrl: './view-production-modal.component.html',
  styleUrls: ['./view-production-modal.component.scss']
})
export class ViewProductionModalComponent implements OnInit {

  assignamentDate: string = "";

  constructor(
    @Inject(DIALOG_DATA) public data: IDialogData,
    public dialogRef: DialogRef
  ) { }

  ngOnInit(): void {
    console.log("view production ",this.data);

    this.assignamentDate = this.data.production.createdDate.split("T")[0];
  }

  onCloseModal(){
    this.dialogRef.close();
  }

}
