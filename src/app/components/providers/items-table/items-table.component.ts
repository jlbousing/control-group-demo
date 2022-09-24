import { Component, OnInit, Input } from '@angular/core';
import { IItem } from 'src/app/interfaces/IItem';
import { ISubcategory } from 'src/app/interfaces/ISubcategory';
import { Dialog } from '@angular/cdk/dialog';
import { EditItemModalComponent } from '../../modals/edit-item-modal/edit-item-modal.component';
import { ISupplier } from 'src/app/interfaces/ISupplier';

@Component({
  selector: 'items-table',
  templateUrl: './items-table.component.html',
  styleUrls: ['./items-table.component.scss']
})
export class ItemsTableComponent implements OnInit {

  @Input("items") items: IItem[] = [];
  @Input("subcategory") subcategory: ISubcategory | null = null;
  @Input("supplier") supplier: ISupplier | null = null;

  constructor(
    private dialog: Dialog
  ) { }

  ngOnInit(): void {
  }

  selectEdit(item: IItem) {

    this.dialog.open(EditItemModalComponent, {
      data: {
        item: item,
        supplierId: this.supplier?.id
      }
    })
  }

}
