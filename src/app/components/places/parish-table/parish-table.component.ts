import { Component, OnInit, Input } from '@angular/core';
import { IParish } from 'src/app/interfaces/IParish';
import { IMunicipality } from 'src/app/interfaces/IMunicipality';
import { EditParishModalComponent } from '../../modals/edit-parish-modal/edit-parish-modal.component';
import { ViewParishModalComponent } from '../../modals/view-parish-modal/view-parish-modal.component';
import { Dialog } from '@angular/cdk/dialog';
import { IState } from 'src/app/interfaces/IState';

@Component({
  selector: 'parish-table',
  templateUrl: './parish-table.component.html',
  styleUrls: ['./parish-table.component.scss']
})
export class ParishTableComponent implements OnInit {


  @Input("parishs") parishs: IParish[] = [];
  @Input("states") states: IState[] = [];
  @Input("municipalities") municipalities: IMunicipality[] = [];
  @Input("municipality") municipality: IMunicipality | null = null;

  constructor(
    private dialog: Dialog
  ) { }

  ngOnInit(): void {
  }

  selectView(parish: IParish) {

    this.dialog.open(ViewParishModalComponent,{
      data: {
        parish: parish,
        municipalities: this.municipalities,
        states: this.states
      }
    });

  }

  selectEdit(parish: IParish) {

    this.dialog.open(EditParishModalComponent,{
      data: {
        parish: parish,
        municipalities: this.municipalities,
        states: this.states
      }
    });
  }

}
