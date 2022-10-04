import { Component, OnInit } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { IAssignament } from 'src/app/interfaces/IAssignament';
import { ISupplier } from 'src/app/interfaces/ISupplier';
import { IRecipe } from 'src/app/interfaces/IRecipe';
import { IProduction } from 'src/app/interfaces/IProduction';
import { DispachtService } from 'src/app/services/dispatch/dispacht.service';
import { AssignamentService } from 'src/app/services/assignaments/assignament.service';
import { RecipesService } from 'src/app/services/recipes/recipes.service';
import { ProductionService } from 'src/app/services/production/production.service';
import { ActivatedRoute } from '@angular/router';
import { IDispatch } from 'src/app/interfaces/IDispacht';
import { SuppliersService } from 'src/app/services/suppliers/suppliers.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlerService } from 'src/app/services/errorhandler/errorhandler.service';

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

  offset: number = 0;

  supplier: ISupplier | null = null;

  constructor(
    public dialog: Dialog,
    private route: ActivatedRoute,
    private dispatchService: DispachtService,
    private assignamentService: AssignamentService,
    private recipeService: RecipesService,
    private productionService: ProductionService,
    private supplierService: SuppliersService,
    private errorHandler: ErrorHandlerService
  ) { }


  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.supplierId = params["supplierId"];

      this.supplierService.findSupplierById(this.supplierId)
        .subscribe((response: ISupplier) => {
          this.supplier = response
        },(error: HttpErrorResponse) => {
          this.errorHandler.handleError(error);
          this.loading = false;
        });

      this.assignamentService.getAssignamentsBySupplier(this.supplierId)
        .subscribe((response: IAssignament[]) => {
          this.assignaments = response;
          this.loading = false;
        },(error: HttpErrorResponse) => {
          this.errorHandler.handleError(error);
          this.loading = false;
        });
    });
  }

  setAssignament(value: any) {
    this.offset = 0;
    this.loading = true;
    let assignament = <IAssignament> value;
    this.assignament = assignament;
    console.log("probando asignacion ",value)

    this.recipeService.getRecipes(50,0,assignament.id).subscribe((response: IRecipe[]) => {
      this.recipes = response;
      this.loading = false;
      console.log("mostrando recipes ",this.recipes)
    },(error: HttpErrorResponse) => {
      this.errorHandler.handleError(error);
      this.loading = false;
    });
  }

  setRecipe(value: any) {
    this.offset = 0;
    this.loading = true;
    this.recipe = <IRecipe> value;
    this.productionService.getProductionByRecipe(50,0,this.recipe.id)
      .subscribe((response: IProduction[]) => {
        this.productions = response;
        this.loading = false;
      },(error: HttpErrorResponse) => {
        this.errorHandler.handleError(error);
        this.loading = false;
      });
  }

  setProduction(value: any) {
    this.offset = 0;
    this.loading = true;
    this.production = <IProduction> value;

    this.dispatchService.getDispatchsByProductionId(10,this.offset,this.production.id)
      .subscribe((response: IDispatch[]) => {
        this.dispatchs = response;
        this.loading = false;
        console.log("probando despachos ",this.dispatchs);
      },(error: HttpErrorResponse) => {
        this.errorHandler.handleError(error);
        this.loading = false;
      });
  }

  changePagination(value: any) {

    this.offset = <number>value;

    this.dispatchService.getDispatchsByProductionId(50,this.offset,this.production!.id)
      .subscribe((response: IDispatch[]) => {
        this.dispatchs = response;
        this.loading = false;
        console.log("probando despachos ",this.dispatchs);
      },(error: HttpErrorResponse) => {
        this.errorHandler.handleError(error);
      });
  }

}
