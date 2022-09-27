import { Component, OnInit, Input, INJECTOR } from '@angular/core';
import { IMunicipality } from 'src/app/interfaces/IMunicipality';
import { ViewMunicipalityModalComponent } from '../../modals/view-municipality-modal/view-municipality-modal.component';
import { EditMunicipalityModalComponent } from '../../modals/edit-municipality-modal/edit-municipality-modal.component';
import { Dialog } from '@angular/cdk/dialog';
import { IState } from 'src/app/interfaces/IState';

@Component({
  selector: 'municipalitie-table',
  templateUrl: './municipalitie-table.component.html',
  styleUrls: ['./municipalitie-table.component.scss']
})
export class MunicipalitieTableComponent implements OnInit {

  @Input("municipalities") municipalities: IMunicipality[] = [];
  @Input("states") states: IState[] = [];
  @Input("state") state: IState | null = null;

  constructor(
    private dialog: Dialog
  ) { }

  ngOnInit(): void {
  }

  selectView(municipality: IMunicipality) {
    this.dialog.open(ViewMunicipalityModalComponent, {
      data: {
        municipality: municipality
      }
    })
  }

  selectEdit(municipality: IMunicipality) {
    this.dialog.open(EditMunicipalityModalComponent, {
      data: {
        municipality: municipality,
        states: this.states,
        state: this.state
      }
    })
  }

}
