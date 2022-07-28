import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'instructions-table',
  templateUrl: './instructions-table.component.html',
  styleUrls: ['./instructions-table.component.scss']
})
export class InstructionsTableComponent implements OnInit {

  @Output() emiterCategoriesTable = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

  selectEdit(){
    let category = {};
    this.emiterCategoriesTable.emit(category);
  }

}
