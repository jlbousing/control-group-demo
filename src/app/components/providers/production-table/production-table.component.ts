import { Component, OnInit, Input, INJECTOR } from '@angular/core';
import { IProduction } from 'src/app/interfaces/IProduction';
import { IRecipe } from 'src/app/interfaces/IRecipe';
import { IAssignament } from 'src/app/interfaces/IAssignament';

@Component({
  selector: 'production-table',
  templateUrl: './production-table.component.html',
  styleUrls: ['./production-table.component.scss']
})
export class ProductionTableComponent implements OnInit {

  @Input("productions") productions: IProduction[] = [];
  @Input("recipe") recipe: IRecipe | null = null;
  @Input("assignament") assignament: IAssignament | null = null;

  constructor() { }

  ngOnInit(): void {
  }

  selectEdit(){
    let category = {};
  }

}
