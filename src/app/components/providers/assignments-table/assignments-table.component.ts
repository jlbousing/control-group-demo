import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'assignments-table',
  templateUrl: './assignments-table.component.html',
  styleUrls: ['./assignments-table.component.scss']
})
export class AssignmentsTableComponent implements OnInit {

  @Output() emiterCategoriesTable = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

  selectEdit(){
    let category = {};
    this.emiterCategoriesTable.emit(category);
  }

}
