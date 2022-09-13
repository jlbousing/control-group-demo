import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ISubcategory } from 'src/app/interfaces/ISubcategory';
import { IStatus } from 'src/app/interfaces/IStatus';
import { Dialog } from '@angular/cdk/dialog';
import { EditCategoriesModalComponent } from '../../modals/edit-categories-modal/edit-categories-modal.component';


@Component({
  selector: 'categories-table',
  templateUrl: './categories-table.component.html',
  styleUrls: ['./categories-table.component.scss']
})
export class CategoriesTableComponent implements OnInit {

  @Input("subcategories") subcategories: ISubcategory[] = [];
  @Input("statues") statues: IStatus[] = [];

  constructor(
    private dialog: Dialog
  ) { }

  ngOnInit(): void {
  }

  selectEdit(subcategory: ISubcategory){

    this.dialog.open(EditCategoriesModalComponent,{
      data: {
        subcategory: subcategory,
        statues: this.statues
      }
    })
  }

}
