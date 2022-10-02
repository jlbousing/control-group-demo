import { Component, OnInit } from '@angular/core';
import { IState } from 'src/app/interfaces/IState';
import { StateService } from 'src/app/services/states/state.service';
import { ErrorHandlerService } from 'src/app/services/errorhandler/errorhandler.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AccessService } from 'src/app/services/access/access.service';

@Component({
  selector: 'app-states',
  templateUrl: './states.component.html',
  styleUrls: ['./states.component.scss']
})
export class StatesComponent implements OnInit {

  states: IState[] = [];

  loading: boolean = true;

  offset: number = 0;

  constructor(
    private stateService: StateService,
    private errorHandler: ErrorHandlerService,
    public accessService: AccessService
  ) { }

  ngOnInit(): void {

    this.stateService.getStates(10,this.offset)
      .subscribe((response: IState[]) => {
        this.states = response;
        this.loading = false;
      },(error: HttpErrorResponse) => {
        this.errorHandler.handleError(error);
      });
  }

  changePagination(value: any) {

    this.offset = <number>value;

    this.stateService.getStates(10,this.offset)
      .subscribe((response: IState[]) => {
        this.states = response;
        this.loading = false;
      },(error: HttpErrorResponse) => {
        this.errorHandler.handleError(error);
      });
  }

}
