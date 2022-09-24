import { Component, OnInit, Input } from '@angular/core';
import { IItem } from 'src/app/interfaces/IItem';
import { ISubcategory } from 'src/app/interfaces/ISubcategory';

@Component({
  selector: 'items-table',
  templateUrl: './items-table.component.html',
  styleUrls: ['./items-table.component.scss']
})
export class ItemsTableComponent implements OnInit {

  @Input("items") items: IItem[] = [];
  @Input("subcategory") subcategory: ISubcategory | null = null;

  constructor() { }

  ngOnInit(): void {
  }

}
