import { Component, OnInit } from '@angular/core';
import { IItemData } from 'src/app/interfaces/IItemData';
import { IAssignament } from 'src/app/interfaces/IAssignament';
import { ActivatedRoute } from '@angular/router';
import { AssignamentService } from 'src/app/services/assignaments/assignament.service';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { ItemsService } from 'src/app/services/items/items.service';
import { IRubro } from 'src/app/interfaces/IRubro';
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
import { SuppliersService } from 'src/app/services/suppliers/suppliers.service';
import { ISupplier } from 'src/app/interfaces/ISupplier';
import { DomSanitizer } from '@angular/platform-browser';

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
  rubros: IRubro[] = [];
  assignament: IAssignament | null = null;
  itemData: IItemData[] = [];
  currentItem: any = null;

  products: IProductRecipe[] = [];

  aux: number = 0;

  loading: boolean = true;

  templates: ITemplate[] = [];
  template: ITemplate | null = null;

  files: any = []
  imagenPrevia: any;
  currentValue: any;

  constructor(
    private route: ActivatedRoute,
    private assignamentService: AssignamentService,
    private categoriesService: CategoriesService,
    private itemsService: ItemsService,
    private instructionsService: InstructionService,
    private router: Router,
    private dialog: Dialog,
    private errorHandler: ErrorHandlerService,
    private templateService: TemplateService,
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

      this.templateService.getTemplates()
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

    console.log("plantilla seleccionada ",this.template);

    //SE OBTIENEN LOS PRODUCTOS DEPENDIENDO DE LA PLANTILLA


    this.template.items[0].forEach((item: any) => {

      item.itemValues.forEach((element: any) => {

        let itemData: IItemData = {
          itemData: {
            itemId: element.id,
            quantity: element.volume,
            itemTypeId: item.id
          }
        };

        console.log("hey bro")
        this.itemData.push(itemData);
      })

    });
    console.log("probando itemData ",this.itemData);

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

  deleteItem(item: IProductRecipe) {
    let index = this.products.indexOf(item);
    this.products.splice(index,1);
    this.itemData.splice(index,1);
  }

  changeQuantity(value: any) {
    console.log(value);
  }

  onSubmit() {

    console.log(this.form.value)
    console.log(this.files);

    if(this.form.value.name
      && this.form.value.description
      && this.form.value.assignament
      && this.files) {

        const payload: IInstructionRequest = {
          name: this.form.value.name,
          asignamentId: this.form.value.assignament!.id,
          description: this.form.value.description,
          itemGroup: this.itemData,
          image: this.files
        };

        console.log(payload);

        const formData = new FormData();
        formData.append("name",payload.name);
        formData.append("assignamentId",payload.asignamentId.toString());
        formData.append("description",payload.description);
        formData.append("itemGroup",JSON.stringify(this.itemData));
        formData.append('image',this.files[0])

        this.instructionsService.createInstruction(formData)
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
