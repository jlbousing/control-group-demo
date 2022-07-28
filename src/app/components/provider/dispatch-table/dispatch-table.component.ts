import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'dispatch-table',
  templateUrl: './dispatch-table.component.html',
  styleUrls: ['./dispatch-table.component.scss']
})
export class DispatchTableComponent implements OnInit {

  @Output() emiterCategoriesTable = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

  selectEdit(){
    let category = {};
    this.emiterCategoriesTable.emit(category);
  }

}
