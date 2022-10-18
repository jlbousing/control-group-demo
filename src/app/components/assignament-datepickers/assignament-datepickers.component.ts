import { Component, OnInit, Output, EventEmitter, ErrorHandler } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { IAssignamentPicker } from 'src/app/interfaces/IAssignamentPicker';

import moment from 'moment';
import { ISubcategory } from 'src/app/interfaces/ISubcategory';
import { HttpErrorResponse } from '@angular/common/http';

interface IMonth {
  name: string;
  id: string;
}

@Component({
  selector: 'assignament-datepickers',
  templateUrl: './assignament-datepickers.component.html',
  styleUrls: ['./assignament-datepickers.component.scss']
})
export class AssignamentDatepickersComponent implements OnInit {

  startDate: string | null = null;
  endDate: string | null = null;

  subCategories: ISubcategory[] = [];
  subCategoryId: number = 1;

  months: IMonth[] = [
    {
      name: "Enero",
      id: "01"
    },
    {
      name: "Febrero",
      id: "02"
    },
    {
      name: "Marzo",
      id: "03"
    },
    {
      name: "Abril",
      id: "04"
    },
    {
      name: "Mayo",
      id: "05"
    },
    {
      name: "Junio",
      id: "06"
    },
    {
      name: "Julio",
      id: "07"
    },
    {
      name: "Agosto",
      id: "08"
    },
    {
      name: "Septiembre",
      id: "09"
    },
    {
      name: "Octubre",
      id: "10"
    },
    {
      name: "Noviembre",
      id: "11"
    },
    {
      name: "Diciembre",
      id: "12"
    },
  ];

  yearsRange: string[] = [];

  initMonth: string | null = "";
  initYear: string | null = "";
  finishMonth: string | null = "";
  finishYear: string | null = "";

  loading: boolean = true;



  @Output() assignamentData = new EventEmitter<IAssignamentPicker>();


  constructor(
    private categoryService: CategoriesService,
    private errorHandler: ErrorHandler
  ) { }

  ngOnInit(): void {

    //ALGORITMO PARA CONSTRUIR RANGO DE YEARS

    for(let i = 2010; i <= new Date().getFullYear(); i++) {
      this.yearsRange.push(i.toString());
    }

    this.categoryService.getSubcategoryByCategoryId(1)
      .subscribe((respponse: ISubcategory[]) => {
        this.subCategories = respponse;
        this.loading = false;
      },(error: HttpErrorResponse) => {
        this.errorHandler.handleError(error);
        this.loading = false;
      });

  }


  setInitMonth(value: any) {

    this.initMonth = <string>value;

    if(this.initMonth && this.initYear) {
      this.startDate = this.initMonth + "-01-" + this.initYear;
      this.endDate = this.initMonth + "-30-" + this.initYear;

      if(this.startDate && this.endDate && this.subCategoryId > 0) {
        const data: IAssignamentPicker = {
          startDate: this.startDate,
          endDate: this.endDate,
          subCategoryId: this.subCategoryId
        };

        this.assignamentData.emit(data);
      }
    }
  }

  setInitYear(value: any) {

    console.log("bandera 3")
    this.initYear = <string>value;

    if(this.initMonth && this.initYear && this.subCategoryId) {
      this.startDate = this.initMonth + "-01-" + this.initYear;
      this.endDate = this.initMonth + "-30-" + this.initYear;

      if(this.startDate && this.endDate && this.subCategoryId > 0) {

        const data: IAssignamentPicker = {
          startDate: this.startDate,
          endDate: this.endDate,
          subCategoryId: this.subCategoryId
        };

        this.assignamentData.emit(data);
      }
    }
  }

}
