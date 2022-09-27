import { Component, OnInit } from '@angular/core';
import { IState } from 'src/app/interfaces/IState';
import { StateService } from 'src/app/services/states/state.service';

@Component({
  selector: 'app-states',
  templateUrl: './states.component.html',
  styleUrls: ['./states.component.scss']
})
export class StatesComponent implements OnInit {

  states: IState[] = [];

  loading: boolean = true;

  constructor(
    private stateService: StateService
  ) { }

  ngOnInit(): void {

    this.stateService.getStates(50,0)
      .subscribe((response: IState[]) => {
        this.states = response;
        this.loading = false;
      })
  }

}
