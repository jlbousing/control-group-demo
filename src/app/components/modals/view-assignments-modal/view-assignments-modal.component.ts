import { Component, OnInit, Inject } from '@angular/core';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { statusNameColor } from 'src/app/utils/statusNameColor';
import { IAssignament } from 'src/app/interfaces/IAssignament';

interface IDialogData {
  assignment: IAssignament
}

@Component({
  selector: 'app-view-assignments-modal',
  templateUrl: './view-assignments-modal.component.html',
  styleUrls: ['./view-assignments-modal.component.scss']
})
export class ViewAssignmentsModalComponent implements OnInit {


  constructor(
    @Inject(DIALOG_DATA) public data: IDialogData,
    public dialogRef: DialogRef) { }

  ngOnInit(): void {

    console.log("hey uya ",this.data.assignment)
  }

  colorStatus() {
    return statusNameColor(this.data.assignment.statusData.status);
  }

}
