import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'production-table',
  templateUrl: './production-table.component.html',
  styleUrls: ['./production-table.component.scss']
})
export class ProductionTableComponent implements OnInit {

  @Output() emiterCategoriesTable = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

  selectEdit(){
    let category = {};
    this.emiterCategoriesTable.emit(category);
  }

}
