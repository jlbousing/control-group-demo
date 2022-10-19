import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { IAssignamentRequest } from 'src/app/interfaces/IAssignamentRequest';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { ICategory } from 'src/app/interfaces/ICategory';
import { ISubcategory } from 'src/app/interfaces/ISubcategory';
import { SuppliersService } from 'src/app/services/suppliers/suppliers.service';
import { ISupplier } from 'src/app/interfaces/ISupplier';
import { StorageManager } from 'src/app/utils/StorageManager';
import { AssignamentService } from 'src/app/services/assignaments/assignament.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Dialog } from '@angular/cdk/dialog';
import { AlertModalComponent } from 'src/app/components/modals/alert-modal/alert-modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlerService } from 'src/app/services/errorhandler/errorhandler.service';
import { CompaniesService } from 'src/app/services/companies/companies.service';
import { ICompany } from 'src/app/interfaces/ICompanies';

@Component({
  selector: 'app-create-assignments',
  templateUrl: './create-assignments.component.html',
  styleUrls: ['./create-assignments.component.scss']
})
export class CreateAssignmentsComponent implements OnInit {

  form = new FormGroup({
    name: new FormControl<string>(this.getCurrentMonthName(),[
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30)
    ]),
    supplierId: new FormControl<number>(0,Validators.required),
    company: new FormControl<ICompany | null>(null,Validators.required),
    categoryId: new FormControl<number>(0,Validators.required),
    subcategoryId: new FormControl<number>(0,Validators.required),
    description: new FormControl<string>('',[
      Validators.minLength(3),
      Validators.maxLength(90)
    ]),
    comments: new FormControl<string>('',[
      Validators.maxLength(250)
    ]),
    record: new FormControl<number>(0,[
      Validators.required,
      Validators.min(1)
    ]),
    special: new FormControl<boolean>(false,Validators.required)
  });

  categoryId: number = 0;
  categories: ICategory[] = [];
  subcategories: ISubcategory[] = [];
  suppliers: ISupplier[] = [];

  companies: ICompany[] = [];

  companyId: number = 0;

  loading: boolean = true;

  constructor(
    private categoryService: CategoriesService,
    private suppliersService: SuppliersService,
    private assignmentService: AssignamentService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: Dialog,
    private errorHandler: ErrorHandlerService,
    private companyService: CompaniesService
  ) { }

  ngOnInit(): void {

    this.getCurrentMonthName();

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.route.params.subscribe((params) => {
      this.companyId = params["companyId"];
      console.log("mostrando compania id ",this.companyId);
    });

    this.categoryService.getCategories(50,0)
      .subscribe((response: ICategory[]) => {
        this.categories = response;
        this.loading = false;
      },(error: HttpErrorResponse) => {
        this.errorHandler.handleError(error);
        this.loading = false;
      });

    this.companyService.getCompanies(50,0)
      .subscribe((response: ICompany[]) => {
        this.companies = response;
        console.log("mostrando companias ",this.companies);
      });
  }

  getCurrentMonthName() {

    const month = new Date().getMonth() + 1;


    switch(month) {
      case 1:
        return "Enero";
      case 2:
        return "Febrero";
      case 3:
        return "Marzo";
      case 4:
        return "Abril";
      case 5:
        return "Mayo";
      case 6:
        return "Junio";
      case 7:
        return "Julio";
      case 8:
        return "Agosto";
      case 9:
        return "Septiembre";
      case 10:
        return "Octubre";
      case 11:
        return "Noviembre";
      case 12:
        return "Diciembre";
      default:
        return "Enero";
    }
  }

  setSubcategoryId(id: any) {
    console.log("recibiendo subcategoria ",id);
    this.form.patchValue({
      subcategoryId: parseInt(id)
    })
  }

  setSuppliers(value: any){

    let company = <ICompany>value;
    console.log(company);
    this.suppliers = this.form.value.company!.suppliersOfCompany;
  }

  onSubmit(){

    console.log(this.form.value);

    if(this.form.value.name
       && this.form.value.supplierId
       && this.form.value.categoryId
       && this.form.value.company
       && this.form.value.subcategoryId
       && this.form.value.description
       && this.form.value.record
       && this.form.value.special !== undefined
       && this.form.value.special !== null) {

        const userInfo: any = StorageManager.getFromLocalStorage('userInfo');

        const payload: IAssignamentRequest = {
          name: this.form.value.name,
          subcategoryId: this.form.value.subcategoryId,
          suppliersId: parseInt(this.form.value.supplierId.toString()),
          companyId: this.form.value.company.id,
          userId: userInfo.id,
          description: this.form.value.description,
          comments: this.form.value.comments ? this.form.value.comments : '',
          record: this.form.value.record,
          special: this.form.value.special
        };

        this.assignmentService.createAssignaments(payload).subscribe((response: any) => {

          console.log(response)

          if(response !== undefined){
            if(response.status !== undefined){
              if(response.status === 400){
                this.dialog.open(AlertModalComponent,{
                  data: {
                    status: 400,
                    message: <string>response.body.result.exception
                  }
                });

              }
            }else{
              this.dialog.open(AlertModalComponent,{
                data: {
                  status: 201,
                  message: <string>response.message.label
                }
              });

              this.router.navigateByUrl("/dashboard/assignaments-list/"+this.form.value.company!.id);
            }

          }

        },(error: HttpErrorResponse) => {
          this.errorHandler.handleError(error);
          this.loading = false;
        })
       }
  }

}
