import { Component, OnInit, Inject } from '@angular/core';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { ISubcategory } from 'src/app/interfaces/ISubcategory';
import { IStatus} from 'src/app/interfaces/IStatus';

interface IDialogData {
  subcategory: ISubcategory,
  statues: IStatus[]
}

@Component({
  selector: 'edit-categories-modal',
  templateUrl: './edit-categories-modal.component.html',
  styleUrls: ['./edit-categories-modal.component.scss']
})
export class EditCategoriesModalComponent implements OnInit {


  constructor(
    @Inject(DIALOG_DATA) public data: IDialogData,
    public dialogRef: DialogRef) { }

  ngOnInit(): void {

    console.log(this.data);
  }


}
