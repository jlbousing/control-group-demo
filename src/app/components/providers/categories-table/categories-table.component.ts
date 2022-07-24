import { Component, OnInit, Output, EventEmitter } from '@angular/core';



@Component({
  selector: 'categories-table',
  templateUrl: './categories-table.component.html',
  styleUrls: ['./categories-table.component.scss']
})
export class CategoriesTableComponent implements OnInit {


  @Output() emiterCategoriesTable = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

  selectEdit(){
    let category = {};
    this.emiterCategoriesTable.emit(category);
  }

}
