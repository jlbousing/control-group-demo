import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/interfaces/ICategory';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlerService } from 'src/app/services/errorhandler/errorhandler.service';

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
    private categoryService: CategoriesService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit(): void {

    this.categoryService.getCategories(10,this.offset)
      .subscribe((response: ICategory[]) => {
        this.categories = response;
        this.loading = false;
      },(error: HttpErrorResponse) => {
        this.errorHandler.handleError(error);
      });
  }

  changePagination(value: any) {

    this.offset = <number>value;

    this.categoryService.getCategories(10,this.offset)
      .subscribe((response: ICategory[]) => {
        this.categories = response;
        this.loading = false;
      },(error: HttpErrorResponse) => {
        this.errorHandler.handleError(error);
      });
  }


}
