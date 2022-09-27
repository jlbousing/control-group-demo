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

  constructor(
    private categoryService: CategoriesService
  ) { }

  ngOnInit(): void {

    this.categoryService.getCategories(50,0)
      .subscribe((response: ICategory[]) => {
        this.categories = response;
        this.loading = false;
      });
  }


}
