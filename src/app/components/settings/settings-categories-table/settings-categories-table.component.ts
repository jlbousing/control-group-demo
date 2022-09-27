import { Component, OnInit, Input } from '@angular/core';
import { ICategory } from 'src/app/interfaces/ICategory';
import { EditSettingsCategoryModalComponent } from '../../modals/edit-settings-category-modal/edit-settings-category-modal.component';
import { Dialog } from '@angular/cdk/dialog';

@Component({
  selector: 'settings-categories-table',
  templateUrl: './settings-categories-table.component.html',
  styleUrls: ['./settings-categories-table.component.scss']
})
export class SettingsCategoriesTableComponent implements OnInit {

  @Input("categories") categories: ICategory[] = [];
  category: ICategory | null = null;

  constructor(
    private dialog: Dialog
  ) { }

  ngOnInit(): void {
  }

  selectEdit(category: ICategory){

    this.dialog.open(EditSettingsCategoryModalComponent,{
      data: {
        category: category
      }
    });
  }

}
