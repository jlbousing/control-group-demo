import { Component, OnInit, Inject } from '@angular/core';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { ITemplate } from 'src/app/interfaces/ITemplate';

interface IDialogData {
  template: ITemplate;
}

@Component({
  selector: 'app-view-template-modal',
  templateUrl: './view-template-modal.component.html',
  styleUrls: ['./view-template-modal.component.scss']
})
export class ViewTemplateModalComponent implements OnInit {

  constructor(
    @Inject(DIALOG_DATA) public data: IDialogData,
    public dialogRef: DialogRef
  ) { }

  ngOnInit(): void {
  }

}
