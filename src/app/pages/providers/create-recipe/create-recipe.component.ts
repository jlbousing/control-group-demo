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

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.scss']
})
export class CreateRecipeComponent implements OnInit {

  form = new FormGroup({
    name: new FormControl<string>('',Validators.required),
    description: new FormControl<string>('',Validators.required),
    assignament: new FormControl<IAssignament | null>(null,Validators.required),
    itemId: new FormControl<number>(0,Validators.required),
    qtx: new FormControl<number>(0,Validators.required),
    unit: new FormControl<string>('',Validators.required),
    qtx2: new FormControl<number>(0,Validators.required)
  });

  supplierId: number = 0;
  assignaments: IAssignament[] = [];
  items: IItem[] = [];
  assignament: IAssignament | null = null;
  itemData: IItemData[] = [];
  currentItem: any = null;

  products: IProductRecipe[] = [];


  constructor(
    private route: ActivatedRoute,
    private assignamentService: AssignamentService,
    private categoriesService: CategoriesService,
    private itemsService: ItemsService,
    private instructionsService: InstructionService
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

  setItems(value: any) {

    console.log(value)
    if(this.form.value.assignament){
      console.log(this.form.value)
      //SE CONSULTAN LOS ITEMS POR LA SUBCATEGORIA SELECCIONADA
      let assignament: IAssignament = this.form.value.assignament;
      this.itemsService.getItems(50,0,assignament.subcategoryData.id)
        .subscribe((response: IItem[]) => {
          this.items = response;
          console.log("probando items ",this.items);
      });
    }
  }

  setItem(value: any) {
    if(value) {
      this.form.value.itemId = value.id;
      this.currentItem = value;
      console.log("itemId ",this.form.value.itemId);
      console.log("currentItem ",this.currentItem);
    }
   }

  clear() {
    this.form.reset();
    console.log(this.form.value)
  }

  storeItem(){

    if(this.form.value.name
      && this.form.value.itemId
      && this.form.value.qtx
      && this.form.value.unit) {

        let newProduct: IProductRecipe = {
          name: this.currentItem.name,
          unit: this.form.value.unit,
          qtx: this.form.value.qtx
        };

        this.products.push(newProduct);

        this.form.value.unit = '';
        this.form.value.qtx2 = 0;
        this.form.value.qtx = 0;
        //this.form.reset();
      }

  }

  deleteItem(item: IProductRecipe) {
    let index = this.products.indexOf(item);
    this.products.splice(index,1);
  }

  onSubmit() {

    if(this.form.value.name
      && this.form.value.description
      && this.form.value.assignament
      && this.products.length > 0) {

        const payload: IInstructionRequest = {
          name: this.form.value.name,
          asignamentId: this.form.value.assignament!.id,
          description: this.form.value.description,
          itemGroup: this.products
        };

        console.log(payload);
        //this.instructionsService.createInstruction(payload)

      }
  }

}
