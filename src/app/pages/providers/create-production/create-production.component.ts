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
import { Dialog } from '@angular/cdk/dialog';
import { AlertModalComponent } from 'src/app/components/modals/alert-modal/alert-modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlerService } from 'src/app/services/errorhandler/errorhandler.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-production',
  templateUrl: './create-production.component.html',
  styleUrls: ['./create-production.component.scss']
})
export class CreateProductionComponent implements OnInit {

  form = new FormGroup({
    assignament: new FormControl<IAssignament | null>(null,Validators.required),
    recipe: new FormControl<IRecipe | null>(null,Validators.required),
    //name: new FormControl<string>('',Validators.required),
    comments: new FormControl<string>('', [
      Validators.minLength(3),
      Validators.maxLength(250)
    ]),
    quantity: new FormControl<number>(0,[
      Validators.required,
      Validators.min(1)
    ]),
    incidents: new FormControl<string>('',[
      Validators.minLength(3),
      Validators.maxLength(250)
    ])
  });

  statues: IStatus[] = [];
  recipes: IRecipe[] = [];
  assignaments: IAssignament[] = [];
  supplierId: number = 0;

  loading: boolean = true;

  constructor(
    private statusService: StatusService,
    private recipeService: RecipesService,
    private route: ActivatedRoute,
    private assignamentService: AssignamentService,
    private productionService: ProductionService,
    private dialog: Dialog,
    private router: Router,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit(): void {

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

      this.route.params.subscribe(params => {
        this.supplierId = params['supplierId'];

        this.assignamentService.getAssignamentsBySupplier(this.supplierId)
          .subscribe((response: IAssignament[]) => {
            this.assignaments = response;
            this.loading = false;
            console.log("probando asignaciones ",this.assignaments);
          },(error: HttpErrorResponse) => {
            this.errorHandler.handleError(error);
          });
     });
  }

  setAssignament(value: any) {
    this.loading = true;
    this.form.value.assignament = <IAssignament> value;

    this.recipeService.getRecipes(50,0,value.id)
      .subscribe((response: IRecipe[]) => {
        this.recipes = response;
        this.loading = false;
      },(error: HttpErrorResponse) => {
        this.errorHandler.handleError(error);
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
      //&& this.form.value.name
      && this.form.value.comments
      && this.form.value.quantity
      && this.form.value.quantity > 0
      && this.form.value.incidents) {

        const userInfo: any = StorageManager.getFromLocalStorage('userInfo');

        console.log("bandera 2");
        const payload: IProductionRequest = {
          //name: this.form.value.name,
          recipeId: this.form.value.recipe.id,
          userId: <number> userInfo.id,
          comments: this.form.value.comments,
          quantity: this.form.value.quantity,
          incidents: this.form.value.incidents
        };

        console.log(payload);

        this.productionService.createProduction(payload)
          .subscribe((response: any) => {
            console.log(response);

            this.dialog.open(AlertModalComponent,{
              data: {
                status: 201,
                message: <string>response.message.label
              }
            });

            this.router.navigateByUrl("/providers/production/"+this.supplierId);
          },(error: HttpErrorResponse) => {
            this.errorHandler.handleError(error);
          });

      }
  }

}
