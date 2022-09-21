import { Component, OnInit } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { IAssignament } from 'src/app/interfaces/IAssignament';
import { IRecipe } from 'src/app/interfaces/IRecipe';
import { IProduction } from 'src/app/interfaces/IProduction';
import { DispachtService } from 'src/app/services/dispatch/dispacht.service';
import { AssignamentService } from 'src/app/services/assignaments/assignament.service';
import { RecipesService } from 'src/app/services/recipes/recipes.service';
import { ProductionService } from 'src/app/services/production/production.service';
import { ActivatedRoute } from '@angular/router';
import { IDispatch } from 'src/app/interfaces/IDispacht';

@Component({
  selector: 'app-dispatch',
  templateUrl: './dispatch.component.html',
  styleUrls: ['./dispatch.component.scss']
})
export class DispatchComponent implements OnInit {

  supplierId: number = 0;
  assignaments: IAssignament[] = [];
  recipes: IRecipe[] = [];
  productions: IProduction[] = [];
  dispatchs: IDispatch[] = [];

  assignament: IAssignament | null = null;
  recipe: IRecipe | null = null;
  production: IProduction | null = null;

  loading: boolean = true;

  constructor(
    public dialog: Dialog,
    private route: ActivatedRoute,
    private dispatchService: DispachtService,
    private assignamentService: AssignamentService,
    private recipeService: RecipesService,
    private productionService: ProductionService
  ) { }


  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.supplierId = params["supplierId"];

      this.assignamentService.getAssignamentsBySupplier(this.supplierId)
        .subscribe((response: IAssignament[]) => {
          this.assignaments = response;
          this.loading = false;
        })
    });
  }

  setAssignament(value: any) {
    this.loading = true;
    let assignament = <IAssignament> value;
    this.assignament = assignament;
    console.log("probando asignacion ",value)

    this.recipeService.getRecipes(50,0,assignament.id).subscribe((response: IRecipe[]) => {
      this.recipes = response;
      this.loading = false;
      console.log("mostrando recipes ",this.recipes)
    })
  }

  setRecipe(value: any) {
    this.loading = true;
    this.recipe = <IRecipe> value;
    this.productionService.getProductionByRecipe(50,0,this.recipe.id)
      .subscribe((response: IProduction[]) => {
        this.productions = response;
        this.loading = false;
      })
  }

  setProduction(value: any) {
    this.loading = true;
    this.production = <IProduction> value;

    this.dispatchService.getDispatchsByProductionId(50,0,this.production.id)
      .subscribe((response: IDispatch[]) => {
        this.dispatchs = response;
        this.loading = false;
        console.log("probando despachos ",this.dispatchs);
      });
  }

}
