import { Component, OnInit, Input } from '@angular/core';
import { IAssignament } from 'src/app/interfaces/IAssignament';
import { Dialog } from '@angular/cdk/dialog';
import { EditAssignmentsModalComponent } from '../../modals/edit-assignments-modal/edit-assignments-modal.component';
import { IStatus } from 'src/app/interfaces/IStatus';
import { ISupplier } from 'src/app/interfaces/ISupplier';

@Component({
  selector: 'assignments-table',
  templateUrl: './assignments-table.component.html',
  styleUrls: ['./assignments-table.component.scss']
})
export class AssignmentsTableComponent implements OnInit {

  @Input("assignments") assignments: IAssignament[] = [];
  @Input("statues") statues: IStatus[] = [];
  @Input("suppliers") suppliers: ISupplier[] = [];

  constructor(
    private dialog: Dialog
  ) { }

  ngOnInit(): void {
  }

  selectEdit(assignment: IAssignament){

    this.dialog.open(EditAssignmentsModalComponent,{
      data: {
        assignment: assignment,
        statues: this.statues,
        suppliers: this.suppliers
      }
    })
  }

}
