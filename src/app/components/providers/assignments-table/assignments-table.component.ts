import { Component, OnInit, Input } from '@angular/core';
import { IAssignament } from 'src/app/interfaces/IAssignament';
import { Dialog } from '@angular/cdk/dialog';
import { EditAssignmentsModalComponent } from '../../modals/edit-assignments-modal/edit-assignments-modal.component';

@Component({
  selector: 'assignments-table',
  templateUrl: './assignments-table.component.html',
  styleUrls: ['./assignments-table.component.scss']
})
export class AssignmentsTableComponent implements OnInit {

  @Input("assignments") assignments: IAssignament[] = [];

  constructor(
    private dialog: Dialog
  ) { }

  ngOnInit(): void {
  }

  selectEdit(assignment: IAssignament){

    this.dialog.open(EditAssignmentsModalComponent,{
      data: {
        assignment: assignment
      }
    })
  }

}
