import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/services/items/items.service';
import { IItem } from 'src/app/interfaces/IItem';
import { ISubcategory } from 'src/app/interfaces/ISubcategory';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { ISupplier } from 'src/app/interfaces/ISupplier';
import { SuppliersService } from 'src/app/services/suppliers/suppliers.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  supplier: ISupplier | null = null;
  supplierId: number = 0;
  items: IItem[] = [];
  subcategories: ISubcategory[] = [];
  subcategory: ISubcategory | null = null;

  loading: boolean = true;

  offset: number = 0;

  constructor(
    private route: ActivatedRoute,
    private itemService: ItemsService,
    private categoriesService: CategoriesService,
    private supplierService: SuppliersService
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {

      this.supplierId = params["supplierId"];

      this.supplierService.findSupplierById(this.supplierId)
        .subscribe((response: ISupplier) => {
          this.supplier = response;

          this.categoriesService.getSubcategoryByCategoryId(this.supplier.categoryData.id)
            .subscribe((response: ISubcategory[]) => {
              this.subcategories = response;
              this.subcategory = response[0]

              this.itemService.getItems(50,this.offset,this.subcategory.id)
                .subscribe((response: IItem[]) => {
                  this.items = response;
                  this.loading = false;
                });
            })
        })
    });
  }

  searchByName(value: any) {

    const name = <string>value;

    if(name && name !== "") {

      this.items = [];
      this.itemService.findItems(this.subcategory!.id,name)
        .subscribe((response: IItem) => {
          this.items.push(response);
        });
      }else {

        this.loading = true;
        this.offset = 0;
        this.itemService.getItems(50,this.offset,this.subcategory!.id)
                .subscribe((response: IItem[]) => {
                  this.items = response;
                  this.loading = false;
                })
      }
  }

  changePagination(value: any) {

    this.offset = <number>value;

    this.itemService.getItems(50,this.offset,this.subcategory!.id)
                .subscribe((response: IItem[]) => {
                  this.items = response;
                  this.loading = false;
                });

  }

}
