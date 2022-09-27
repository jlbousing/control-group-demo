import { Component, OnInit, Input } from '@angular/core';
import { ICategory } from 'src/app/interfaces/ICategory';

@Component({
  selector: 'settings-categories-table',
  templateUrl: './settings-categories-table.component.html',
  styleUrls: ['./settings-categories-table.component.scss']
})
export class SettingsCategoriesTableComponent implements OnInit {

  @Input("categories") categories: ICategory[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  selectView() {

  }

  selectEdit(){

  }

}
