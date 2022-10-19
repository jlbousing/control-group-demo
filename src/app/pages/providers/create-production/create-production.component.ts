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
import { SuppliersService } from 'src/app/services/suppliers/suppliers.service';
import { Router } from '@angular/router';
import { ISupplier } from 'src/app/interfaces/ISupplier';
import { DomSanitizer } from '@angular/platform-browser';


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
      Validators.maxLength(250)
    ]),
    quantity: new FormControl<number>(0,[
      Validators.required,
      Validators.min(1)
    ]),
    incidents: new FormControl<string>('',[
      Validators.maxLength(250)
    ])
  });

  statues: IStatus[] = [];
  recipes: IRecipe[] = [];
  assignaments: IAssignament[] = [];
  supplierId: number = 0;

  companyId: number = 0;

  loading: boolean = true;

  files: any = [];
  imagenPrevia: any;

  constructor(
    private statusService: StatusService,
    private recipeService: RecipesService,
    private route: ActivatedRoute,
    private assignamentService: AssignamentService,
    private productionService: ProductionService,
    private dialog: Dialog,
    private router: Router,
    private errorHandler: ErrorHandlerService,
    private supplierService: SuppliersService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

      this.route.params.subscribe(params => {
        this.supplierId = params['supplierId'];

        this.supplierService.findSupplierById(this.supplierId)
          .subscribe((response: ISupplier) => {

            this.assignamentService.getAssignamentsByCompany(response.companyData.id)
              .subscribe((response: IAssignament[]) => {
                  this.assignaments = response;
                  this.loading = false;
              },(error: HttpErrorResponse) => {
                this.errorHandler.handleError(error);
                this.loading = false;
              });
          },(error: HttpErrorResponse) => {
            this.errorHandler.handleError(error);
            this.loading = false;
          });
     });
  }

  blobFile = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          blob: $event,
          image,
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          blob: $event,
          image,
          base: null
        });
      };

    } catch (e) {
      return null;
    }
  })

  onFileSelected(event: any) {

    const imagen = event.target.files[0];
    console.log(imagen);
    let text = 'image/'
    if (imagen.type.includes(text)) {
      console.log('Si es una imagen');
      this.files.push(imagen)
      this.blobFile(imagen).then((res: any) => {
        this.imagenPrevia = res.base;

      })
    } else {
      console.log('No es imagen');

    }
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
      && this.form.value.quantity
      && this.form.value.quantity > 0
      && this.files
      && this.supplierId > 0) {

        const userInfo: any = StorageManager.getFromLocalStorage('userInfo');

        console.log("bandera 2");
        const payload: IProductionRequest = {
          //name: this.form.value.name,
          supplierId: this.supplierId,
          recipeId: this.form.value.recipe.id,
          userId: <number> userInfo.id,
          comments: this.form.value.comments ? this.form.value.comments : "",
          quantity: this.form.value.quantity,
          incidents: this.form.value.incidents ? this.form.value.incidents : "",
          image: this.files
        };

        console.log(payload);

        const formData = new FormData();
        formData.append("supplierId",payload.supplierId.toString());
        formData.append("recipeId",payload.recipeId.toString());
        formData.append("userId",payload.userId.toString());
        formData.append("quantity",payload.quantity.toString());
        formData.append("incidents",payload.incidents.toString());
        formData.append('image',this.files[0]);

        this.productionService.createProduction(formData)
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
