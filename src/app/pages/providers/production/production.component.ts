import { Component, OnInit } from '@angular/core';
import { CreateProductionModalComponent } from 'src/app/components/modals/create-production-modal/create-production-modal.component';
import { ViewProductionModalComponent } from 'src/app/components/modals/view-production-modal/view-production-modal.component';
import {Dialog, DIALOG_DATA} from '@angular/cdk/dialog';
import { ActivatedRoute } from '@angular/router';
import { AssignamentService } from 'src/app/services/assignaments/assignament.service';
import { ProductionService } from 'src/app/services/production/production.service';
import { RecipesService } from 'src/app/services/recipes/recipes.service';
import { IAssignament } from 'src/app/interfaces/IAssignament';
import { IRecipe } from 'src/app/interfaces/IRecipe';
import { IProduction } from 'src/app/interfaces/IProduction';

@Component({
  selector: 'app-production',
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.scss']
})
export class ProductionComponent implements OnInit {

  supplierId: number = 0;
  assignaments: IAssignament[] = [];
  assignament: IAssignament | null = null;
  recipes: IRecipe[] = [];
  recipe: IRecipe | null = null;
  productions: IProduction[] = [];

  constructor(
    public dialog: Dialog,
    private assignamentService: AssignamentService,
    private recipesService: RecipesService,
    private productionService: ProductionService,
    private route: ActivatedRoute
  ) { }


  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.supplierId = params['supplierId'];

      this.assignamentService.getAssignamentsBySupplier(this.supplierId)
        .subscribe((response: IAssignament[]) => {
          this.assignaments = response;
          console.log("probando asignaciones ",this.assignaments);
        })
   });

  }

  setAssignament(value: any) {
    let assignament = <IAssignament> value;
    this.assignament = assignament;
    console.log("probando asignacion ",value)

    this.recipesService.getRecipes(50,0,assignament.id).subscribe((response: IRecipe[]) => {
      this.recipes = response;
      console.log("mostrando recipes ",this.recipes)
    })
  }

  setRecipe(value: any) {
    this.recipe = <IRecipe> value;
    this.productionService.getProductionByRecipe(50,0,this.recipe.id)
      .subscribe((response: IProduction[]) => {
        this.productions = response;
      })
  }

}
