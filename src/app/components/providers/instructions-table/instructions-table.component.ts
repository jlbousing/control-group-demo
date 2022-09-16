import { Component, OnInit, OnChanges ,Input, SimpleChanges } from '@angular/core';
import { RecipesService } from 'src/app/services/recipes/recipes.service';
import { IRecipe } from 'src/app/interfaces/IRecipe';

@Component({
  selector: 'instructions-table',
  templateUrl: './instructions-table.component.html',
  styleUrls: ['./instructions-table.component.scss']
})
export class InstructionsTableComponent implements OnInit, OnChanges {

  @Input("assignamentId") assignamentId: number = 0;

  recipes: IRecipe[] = [];

  constructor(
    private recipesService: RecipesService
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {

    if(changes["assignamentId"].currentValue && changes["assignamentId"].currentValue > 0){

      console.log("probando id assigment ",changes["assignamentId"]);
      let id = parseInt(changes["assignamentId"].currentValue);
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
