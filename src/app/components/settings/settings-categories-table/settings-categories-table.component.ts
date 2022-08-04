import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'settings-categories-table',
  templateUrl: './settings-categories-table.component.html',
  styleUrls: ['./settings-categories-table.component.scss']
})
export class SettingsCategoriesTableComponent implements OnInit {

  @Output() emiterCategoriesTable = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  selectEdit(){
    let category = {};
    this.emiterCategoriesTable.emit(category);
  }

}
