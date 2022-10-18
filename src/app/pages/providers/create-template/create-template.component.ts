import { Component, OnInit } from '@angular/core';
import { IItemData } from 'src/app/interfaces/IItemData';
import { IAssignament } from 'src/app/interfaces/IAssignament';
import { ItemsService } from 'src/app/services/items/items.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IProductRecipe } from 'src/app/interfaces/IProductRecipe';
import { ITemplateRequest } from 'src/app/interfaces/ITemplateRequest';
import { Router } from '@angular/router';
import { Dialog } from '@angular/cdk/dialog';
import { AlertModalComponent } from 'src/app/components/modals/alert-modal/alert-modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlerService } from 'src/app/services/errorhandler/errorhandler.service';
import { TemplateService } from 'src/app/services/templates/template.service';
import { IRubro } from 'src/app/interfaces/IRubro';

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
    item: new FormControl<IRubro | null>(null,Validators.required)
  });

  items: IRubro[] = [];
  itemsSelected: number[] = [];
  productsSelected: IRubro[] = [];

  assignaments: IAssignament[] = [];
  assignament: IAssignament | null = null;
  itemData: IItemData[] = [];
  currentItem: IRubro | null = null;

  products: IProductRecipe[] = [];

  aux: number = 0;

  loading: boolean = true;

  constructor(
    private itemsService: ItemsService,
    private router: Router,
    private errorHandler: ErrorHandlerService,
    private dialog: Dialog,
    private templateService: TemplateService,

  ) { }

  ngOnInit(): void {

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.itemsService.getRubros(50,0)
      .subscribe((response: IRubro[]) => {
        this.items = response;
        this.loading = false;
      },(error: HttpErrorResponse) => {
        this.errorHandler.handleError(error);
        this.loading = false;
      });
  }

  setItem(value: any) {
    this.currentItem = <IRubro>value;
   }


  storeItem() {

    if(this.currentItem) {

      let result: any = this.productsSelected.find((item: IRubro) => { return item.id === this.currentItem?.id});
      if(!result){
        this.productsSelected.push(this.currentItem);
      }else{

        this.dialog.open(AlertModalComponent,{
          data: {
            status: 400,
            message: `El producto ${this.currentItem.name} ya ha sido agregado`
          }
        });
      }
    }

  }

  clear() {
    this.form.reset();
    this.itemsSelected = [];
  }

  deleteItem(item: IRubro) {
    let index = this.productsSelected.indexOf(item);
    this.productsSelected.splice(index,1);
  }

  onSubmit() {

    if(this.form.value.name
      && this.productsSelected.length > 0) {

        const payload: ITemplateRequest = {
          name: this.form.value.name,
          items: this.productsSelected.map((item: IRubro) => item.id)
        };

        this.templateService.createTemplate(payload)
          .subscribe((response: any) => {

            this.dialog.open(AlertModalComponent,{
              data: {
                status: 201,
                message: <string>response.message.label
              }
            });

            this.router.navigateByUrl("/settings/templates");
          },(error: HttpErrorResponse) => {
            this.errorHandler.handleError(error);
          });

      }

  }



}
