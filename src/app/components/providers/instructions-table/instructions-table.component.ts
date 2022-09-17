import { Component, OnInit, OnChanges ,Input, SimpleChanges } from '@angular/core';
import { RecipesService } from 'src/app/services/recipes/recipes.service';
import { IRecipe } from 'src/app/interfaces/IRecipe';
import { IAssignament } from 'src/app/interfaces/IAssignament';

@Component({
  selector: 'instructions-table',
  templateUrl: './instructions-table.component.html',
  styleUrls: ['./instructions-table.component.scss']
})
export class InstructionsTableComponent implements OnInit, OnChanges {

  @Input("assignament") assignament: IAssignament | null = null;

  recipes: IRecipe[] = [];

  constructor(
    private recipesService: RecipesService
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {

    console.log("cambio asignacion ",changes['assignament']);

    if(changes["assignament"].currentValue){

      console.log("probando id assigment ",changes["assignament"]);
      this.assignament = <IAssignament> changes["assignament"].currentValue;
      let id = parseInt(changes["assignament"].currentValue.id);
      this.recipesService.getRecipes(50,0,id).subscribe((response: IRecipe[]) => {
        this.recipes = response;
        console.log("mostrando recipes ",this.recipes)
      })
    }
  }

  selectEdit(){
    let category = {};
  }

}
