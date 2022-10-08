import { Component, OnInit } from '@angular/core';
import { IItemData } from 'src/app/interfaces/IItemData';
import { IAssignament } from 'src/app/interfaces/IAssignament';
import { ActivatedRoute } from '@angular/router';
import { AssignamentService } from 'src/app/services/assignaments/assignament.service';
import { ItemsService } from 'src/app/services/items/items.service';
import { IItem } from 'src/app/interfaces/IItem';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IProductRecipe } from 'src/app/interfaces/IProductRecipe';
import { ITemplateRequest } from 'src/app/interfaces/ITemplateRequest';
import { Router } from '@angular/router';
import { Dialog } from '@angular/cdk/dialog';
import { AlertModalComponent } from 'src/app/components/modals/alert-modal/alert-modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlerService } from 'src/app/services/errorhandler/errorhandler.service';
import { TemplateService } from 'src/app/services/templates/template.service';

@Component({
  selector: 'app-create-template',
  templateUrl: './create-template.component.html',
  styleUrls: ['./create-template.component.scss']
})
export class CreateTemplateComponent implements OnInit {

  form = new FormGroup({
    name: new FormControl<string>('',[
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30)
    ]),
    assignament: new FormControl<IAssignament | null>(null,Validators.required),
    item: new FormControl<IItem | null>(null,Validators.required)
  });

  items: IItem[] = [];
  itemsSelected: number[] = [];
  productsSelected: IItem[] = [];

  supplierId: number = 0;
  assignaments: IAssignament[] = [];
  assignament: IAssignament | null = null;
  itemData: IItemData[] = [];
  currentItem: any = null;

  products: IProductRecipe[] = [];

  aux: number = 0;

  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private assignamentService: AssignamentService,
    private itemsService: ItemsService,
    private router: Router,
    private errorHandler: ErrorHandlerService,
    private dialog: Dialog,
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
          this.loading = false;
          console.log("probando items ",this.items);
      },(error: HttpErrorResponse) => {
        this.errorHandler.handleError(error);
      });
    }
  }


  setItem(value: any) {
    this.currentItem = <IItem>value;
    console.log("probando current item ",this.currentItem);
   }


  storeItem() {
    this.productsSelected.push(this.currentItem);
   }

  clear() {
    this.form.reset();
    this.itemsSelected = [];
  }

  deleteItem(item: IItem) {
    let index = this.productsSelected.indexOf(item);
    this.productsSelected.splice(index,1);
  }

  onSubmit() {

    if(this.form.value.name
      && this.form.value.assignament
      && this.productsSelected.length > 0) {

        const payload: ITemplateRequest = {
          asignamentId: this.form.value.assignament.id,
          name: this.form.value.name,
          items: this.productsSelected.map((item: IItem) => item.id)
        };

        this.templateService.createTemplate(payload)
          .subscribe((response: any) => {

            this.dialog.open(AlertModalComponent,{
              data: {
                status: 201,
                message: <string>response.message.label
              }
            });

            this.router.navigateByUrl("/providers/templates/"+this.supplierId);
          },(error: HttpErrorResponse) => {
            this.errorHandler.handleError(error);
          });

      }

  }



}