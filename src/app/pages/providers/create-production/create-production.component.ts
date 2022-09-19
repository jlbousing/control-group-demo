import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IRecipe } from 'src/app/interfaces/IRecipe';
import { IAssignament } from 'src/app/interfaces/IAssignament';
import { IProductionRequest } from 'src/app/interfaces/IProductionRequest';
import { IStatus } from 'src/app/interfaces/IStatus';
import { StatusService } from 'src/app/services/status/status.service';
import { AssignamentService } from 'src/app/services/assignaments/assignament.service';
import { ProductionService } from 'src/app/services/production/production.service';
import { StorageManager } from 'src/app/utils/StorageManager';
import { RecipesService } from 'src/app/services/recipes/recipes.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-create-production',
  templateUrl: './create-production.component.html',
  styleUrls: ['./create-production.component.scss']
})
export class CreateProductionComponent implements OnInit {

  form = new FormGroup({
    assignament: new FormControl<IAssignament | null>(null,Validators.required),
    recipe: new FormControl<IRecipe | null>(null,Validators.required),
    name: new FormControl<string>('',Validators.required),
    comments: new FormControl<string>('', Validators.required),
    quantity: new FormControl<number>(0,Validators.required),
    status: new FormControl<number>(0,Validators.required)
  });

  statues: IStatus[] = [];
  recipes: IRecipe[] = [];
  assignaments: IAssignament[] = [];
  supplierId: number = 0;

  constructor(
    private statusService: StatusService,
    private recipeService: RecipesService,
    private route: ActivatedRoute,
    private assignamentService: AssignamentService,
    private productionService: ProductionService
  ) { }

  ngOnInit(): void {

    this.statusService.getStatues(2,50,0)
      .subscribe((response: IStatus[]) => {
        this.statues = response;
      });

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
    this.form.value.assignament = <IAssignament> value;

    this.recipeService.getRecipes(50,0,value.id)
      .subscribe((response: IRecipe[]) => {
        this.recipes = response;
      });
  }

  setRecipe(value: any) {
    this.form.value.recipe = <IRecipe>value;
  }

  onSubmit() {

    console.log(this.form.value);
    console.log("bandera 1");
    if(this.form.value.assignament
      && this.form.value.recipe
      && this.form.value.name
      && this.form.value.comments
      && this.form.value.quantity
      && this.form.value.quantity > 0
      && this.form.value.status) {

        const userInfo: any = StorageManager.getFromLocalStorage('userInfo');

        console.log("bandera 2");
        const payload: IProductionRequest = {
          name: this.form.value.name,
          recipeId: this.form.value.recipe.id,
          status: this.form.value.status,
          userId: <number> userInfo.id,
          comments: this.form.value.comments,
          quantity: this.form.value.quantity
        };

        console.log(payload);

        this.productionService.createProduction(payload)
          .subscribe((response: any) => {
            console.log(response);
            alert(response.message.label);
          })

      }
  }

}
