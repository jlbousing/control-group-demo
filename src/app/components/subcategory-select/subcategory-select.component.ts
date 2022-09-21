import { Component, OnInit, Input, Output, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { ISubcategory } from 'src/app/interfaces/ISubcategory';

@Component({
  selector: 'subcategory-select',
  templateUrl: './subcategory-select.component.html',
  styleUrls: ['./subcategory-select.component.scss']
})
export class SubcategorySelectComponent implements OnInit, OnChanges {


  @Input("categoryId") categoryId: number | null = 0;
  @Output() subCategoryEmiter: EventEmitter<any> = new EventEmitter();
  subcategories: ISubcategory[] = [];
  subcategoryId: number = 0;

  constructor(
    private categoryService: CategoriesService
  ) { }


  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    console.log(changes["categoryId"].currentValue);
    const id = changes["categoryId"].currentValue;
    this.categoryService.getSubcategoryByCategoryId(id)
      .subscribe((response: ISubcategory[]) => {
        this.subcategories = response;
      })
  }

  sendSubcategoryId(id: number) {
    console.log(id)
    this.subCategoryEmiter.emit(this.subcategoryId);
  }


  ngOnInit(): void {
  }

}
