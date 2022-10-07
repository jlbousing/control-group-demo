import { Component, OnInit } from '@angular/core';
import { IItemData } from 'src/app/interfaces/IItemData';
import { IAssignament } from 'src/app/interfaces/IAssignament';
import { ActivatedRoute } from '@angular/router';
import { AssignamentService } from 'src/app/services/assignaments/assignament.service';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { ItemsService } from 'src/app/services/items/items.service';
import { IItem } from 'src/app/interfaces/IItem';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IProductRecipe } from 'src/app/interfaces/IProductRecipe';
import { IInstructionRequest } from 'src/app/interfaces/IInstuctionRequest';
import { InstructionService } from 'src/app/services/instructions/instruction.service';
import { Router } from '@angular/router';
import { Dialog } from '@angular/cdk/dialog';
import { AlertModalComponent } from 'src/app/components/modals/alert-modal/alert-modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlerService } from 'src/app/services/errorhandler/errorhandler.service';
import { ITemplate } from 'src/app/interfaces/ITemplate';
import { TemplateService } from 'src/app/services/templates/template.service';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.scss']
})
export class CreateRecipeComponent implements OnInit {

  form = new FormGroup({
    name: new FormControl<string>('',[
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30)
    ]),
    description: new FormControl<string>('',[
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(90)
    ]),
    assignament: new FormControl<IAssignament | null>(null,Validators.required),
    template: new FormControl<ITemplate | null>(null,Validators.required)
  });

  supplierId: number = 0;
  assignaments: IAssignament[] = [];
  items: IItem[] = [];
  assignament: IAssignament | null = null;
  itemData: IItemData[] = [];
  currentItem: any = null;

  products: IProductRecipe[] = [];

  aux: number = 0;

  loading: boolean = true;

  templates: ITemplate[] = [];
  template: ITemplate | null = null;

  constructor(
    private route: ActivatedRoute,
    private assignamentService: AssignamentService,
    private categoriesService: CategoriesService,
    private itemsService: ItemsService,
    private instructionsService: InstructionService,
    private router: Router,
    private dialog: Dialog,
    private errorHandler: ErrorHandlerService,
    private templateService: TemplateService
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
        })
   });
  }


  /*
  setItems(value: any) {

    this.loading = false;
    console.log(value)
    if(this.form.value.assignament){
      console.log(this.form.value)
      //SE CONSULTAN LOS ITEMS POR LA SUBCATEGORIA SELECCIONADA
      let assignament: IAssignament = this.form.value.assignament;
      this.itemsService.getItems(50,0,assignament.subcategoryData.id)
        .subscribe((response: IItem[]) => {
          this.items = response;

          this.items.forEach((item: IItem) => {
            let itemData: IItemData = {
              itemData: {
                itemId: item.id,
                quantity: item.quantity
              }
            };

            this.itemData.push(itemData);
          });

          console.log("probando itemData ",this.itemData);
          this.loading = false;
      },(error: HttpErrorResponse) => {
        this.errorHandler.handleError(error);
      });
    }
  } */

  setTemplate(value: any) {

    this.loading = true;

    if(this.form.value.assignament) {

      let assignament: IAssignament = this.form.value.assignament;

      this.templateService.getTemplates(assignament.id)
        .subscribe((response: ITemplate[]) => {
          this.templates = response;
          this.loading = false;
        },(error: HttpErrorResponse) => {
          this.errorHandler.handleError(error);
          this.loading = false;
        });

    }
  }

  setItems(value: any) {

    this.template = <ITemplate>value;

    //SE OBTIENEN LOS PRODUCTOS DEPENDIENDO DE LA PLANTILLA
    console.log("probando template ",this.template);
    this.template.items[0].forEach((item: IItem) => {
      let itemData: IItemData = {
        itemData: {
          itemId: item.id,
          quantity: item.quantity
        }
      };

      this.itemData.push(itemData);

    });

  }





/*
  storeItem(){



    if(this.form.value.name
      && this.form.value.item
      && this.form.value.qtx2) {


        let newProduct: IProductRecipe = {
          name: this.currentItem.name,
          unit: this.currentItem.unit,
          qtx: this.currentItem.quantity
        };

        this.products.push(newProduct);

        this.itemData.push({
          itemData: {
            itemId: this.currentItem.id,
            quantity: this.form.value.qtx2
          }
        });

        this.form.value.qtx2 = 0;
        //this.form.reset();
      }

  } */

  deleteItem(item: IProductRecipe) {
    let index = this.products.indexOf(item);
    this.products.splice(index,1);
    this.itemData.splice(index,1);
  }

  onSubmit() {

    if(this.form.value.name
      && this.form.value.description
      && this.form.value.assignament) {

        const payload: IInstructionRequest = {
          name: this.form.value.name,
          asignamentId: this.form.value.assignament!.id,
          description: this.form.value.description,
          itemGroup: this.itemData
        };

        console.log(payload);
        this.instructionsService.createInstruction(payload)
          .subscribe((response: any) => {
            console.log(response);

            this.dialog.open(AlertModalComponent,{
              data: {
                status: 201,
                message: <string>response.message.label
              }
            })
            this.router.navigateByUrl(`/providers/instructions/${this.supplierId}`)
          },(error: HttpErrorResponse) => {
            this.errorHandler.handleError(error);
          });

      }
  }

}
