import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ISubcategory } from 'src/app/interfaces/ISubcategory';


@Component({
  selector: 'categories-table',
  templateUrl: './categories-table.component.html',
  styleUrls: ['./categories-table.component.scss']
})
export class CategoriesTableComponent implements OnInit {

  @Input("subcategories") subcategories: ISubcategory[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  selectEdit(){
    let category = {};
  }

}
