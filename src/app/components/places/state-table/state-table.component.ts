import { Component, OnInit, Input } from '@angular/core';
import { IState } from 'src/app/interfaces/IState';

@Component({
  selector: 'state-table',
  templateUrl: './state-table.component.html',
  styleUrls: ['./state-table.component.scss']
})
export class StateTableComponent implements OnInit {

  @Input("states") states: IState[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
