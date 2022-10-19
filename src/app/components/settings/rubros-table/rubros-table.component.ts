import { Component, OnInit, Input } from '@angular/core';
import { IRubro } from 'src/app/interfaces/IRubro';
import { ISubcategory } from 'src/app/interfaces/ISubcategory';
import { Dialog } from '@angular/cdk/dialog';
import { EditRubroModalComponent } from '../../modals/edit-rubro-modal/edit-rubro-modal.component';
import { ISupplier } from 'src/app/interfaces/ISupplier';


@Component({
  selector: 'rubros-table',
  templateUrl: './rubros-table.component.html',
  styleUrls: ['./rubros-table.component.scss']
})
export class RubrosTableComponent implements OnInit {

  @Input("items") items: IRubro[] = [];
  @Input("subcategory") subcategory: ISubcategory | null = null;

  constructor(
    private dialog: Dialog
  ) { }

  ngOnInit(): void {
  }

  selectEdit(item: IRubro) {

    this.dialog.open(EditRubroModalComponent, {
      data: {
        rubro: item
      }
    })
  }


}
