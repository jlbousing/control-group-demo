import { Component, OnInit, Input } from '@angular/core';
import { IState } from 'src/app/interfaces/IState';
import { Dialog } from '@angular/cdk/dialog';
import { ViewStateModalComponent } from '../../modals/view-state-modal/view-state-modal.component';

@Component({
  selector: 'state-table',
  templateUrl: './state-table.component.html',
  styleUrls: ['./state-table.component.scss']
})
export class StateTableComponent implements OnInit {

  @Input("states") states: IState[] = [];
  constructor(
    private dialog: Dialog
  ) { }

  ngOnInit(): void {
  }

  selectView(state: IState) {

    this.dialog.open(ViewStateModalComponent,{
      data: {
        state: state
      }
    });
  }

}
