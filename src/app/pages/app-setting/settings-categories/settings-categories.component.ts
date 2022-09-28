import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/interfaces/ICategory';
import { CategoriesService } from 'src/app/services/categories/categories.service';

@Component({
  selector: 'app-settings-categories',
  templateUrl: './settings-categories.component.html',
  styleUrls: ['./settings-categories.component.scss']
})
export class SettingsCategoriesComponent implements OnInit {

  categories: ICategory[] = [];
  loading: boolean = true;

  offset: number = 0;

  constructor(
    private categoryService: CategoriesService
  ) { }

  ngOnInit(): void {

    this.categoryService.getCategories(50,this.offset)
      .subscribe((response: ICategory[]) => {
        this.categories = response;
        this.loading = false;
      });
  }

  changePagination(value: any) {

    this.offset = <number>value;

    this.categoryService.getCategories(50,this.offset)
      .subscribe((response: ICategory[]) => {
        this.categories = response;
        this.loading = false;
      });
  }


}
