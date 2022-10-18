import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/services/items/items.service';
import { IRubro } from 'src/app/interfaces/IRubro';
import { ISubcategory } from 'src/app/interfaces/ISubcategory';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { ISupplier } from 'src/app/interfaces/ISupplier';
import { SuppliersService } from 'src/app/services/suppliers/suppliers.service';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlerService } from 'src/app/services/errorhandler/errorhandler.service';
import { AccessService } from 'src/app/services/access/access.service';

@Component({
  selector: 'app-rubros',
  templateUrl: './rubros.component.html',
  styleUrls: ['./rubros.component.scss']
})
export class RubrosComponent implements OnInit {

  items: IRubro[] = [];
  subcategories: ISubcategory[] = [];
  subcategory: ISubcategory | null = null;

  loading: boolean = true;

  offset: number = 0;

  constructor(
    private route: ActivatedRoute,
    private itemService: ItemsService,
    private categoriesService: CategoriesService,
    private supplierService: SuppliersService,
    private errorHandler: ErrorHandlerService,
    public accessService: AccessService
  ) { }

  ngOnInit(): void {

    this.categoriesService.findSubcategory(1)
      .subscribe((response: ISubcategory) => {
        this.subcategory = response;
      },(error: HttpErrorResponse) => {
        this.errorHandler.handleError(error);
      });

    this.itemService.getRubros(10,this.offset)
      .subscribe((response: IRubro[]) => {
        this.items = response
        this.loading = false;
      },(error: HttpErrorResponse) => {
        this.errorHandler.handleError(error);
        this.loading = false;
      });
  }

  searchByName(value: any) {

    const name = <string>value;

    if(name && name !== "") {

      this.items = [];

      if(name.length >= 3){
        this.itemService.findItems(this.subcategory!.id,name)
        .subscribe((response: IRubro) => {
          this.items.push(response);
        },(error: HttpErrorResponse) => {
          this.errorHandler.handleError(error);
          this.loading = false;
        });
      }else{
        this.loading = false;
      }
      }else {

        this.loading = true;
        this.offset = 0;
        this.itemService.getItems(10,this.offset,this.subcategory!.id)
                .subscribe((response: IRubro[]) => {
                  this.items = response;
                  this.loading = false;
                },(error: HttpErrorResponse) => {
                  this.errorHandler.handleError(error);
                  this.loading = false;
                })
      }
  }

  changePagination(value: any) {

    this.offset = <number>value;

    this.itemService.getItems(10,this.offset,this.subcategory!.id)
                .subscribe((response: IRubro[]) => {
                  this.items = response;
                  this.loading = false;
                },(error: HttpErrorResponse) => {
                  this.errorHandler.handleError(error);
                  this.loading = false;
                });
  }

}
