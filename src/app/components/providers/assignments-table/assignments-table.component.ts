import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { IAssignament } from 'src/app/interfaces/IAssignament';

@Component({
  selector: 'assignments-table',
  templateUrl: './assignments-table.component.html',
  styleUrls: ['./assignments-table.component.scss']
})
export class AssignmentsTableComponent implements OnInit {

  //@Output() emiterCategoriesTable = new EventEmitter<any>();
  @Input("assignments") assignments: IAssignament[] = [];
  constructor() { }

  ngOnInit(): void {
  }

  selectEdit(){
    //let category = {};
    //this.emiterCategoriesTable.emit(category);
  }

}
