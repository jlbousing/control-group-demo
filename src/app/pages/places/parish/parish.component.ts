import { Component, OnInit } from '@angular/core';
import { IMunicipality } from 'src/app/interfaces/IMunicipality';
import { IState } from 'src/app/interfaces/IState';
import { StateService } from 'src/app/services/states/state.service';
import { MunicipalityService } from 'src/app/services/municipality/municipality.service';
import { ParishService } from 'src/app/services/parsih/parish.service';
import { IParish } from 'src/app/interfaces/IParish';
import { Dialog } from '@angular/cdk/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlerService } from 'src/app/services/errorhandler/errorhandler.service';


@Component({
  selector: 'app-parish',
  templateUrl: './parish.component.html',
  styleUrls: ['./parish.component.scss']
})
export class ParishComponent implements OnInit {

  states: IState[] = [];
  state: IState | null = null;

  municipalities: IMunicipality[] = [];
  municipality: IMunicipality | null = null;

  parishs: IParish[] = [];

  loading: boolean = true;

  offset: number = 10;

  constructor(
    private stateService: StateService,
    private muncipalityService: MunicipalityService,
    private parishService: ParishService,
    private dialog: Dialog,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit(): void {

    this.stateService.getStates(50,0)
      .subscribe((response: IState[]) => {
        this.states = response
        this.loading = false;
      },(error: HttpErrorResponse) => {
        this.errorHandler.handleError(error);
      });
  }

  setState(value: any) {

    this.offset = 0;
    this.loading = true;
    this.state = <IState>value;

    this.muncipalityService.getMunicipality(50,0,this.state.id)
      .subscribe((response: IMunicipality[]) => {
        this.municipalities = response;
        this.loading = false;
      },(error: HttpErrorResponse) => {
        this.errorHandler.handleError(error);
      });
  }

  setMunicipality(value: any) {

    this.offset = 0;
    this.loading = true;
    this.municipality = <IMunicipality>value;

    this.parishService.getParish(50,this.offset,this.municipality.id)
      .subscribe((response: IParish[]) => {
        this.parishs = response;
        this.loading = false;
      },(error: HttpErrorResponse) => {
        this.errorHandler.handleError(error);
      });
  }

  changePagination(value: any) {

    this.offset = <number>value;

    this.parishService.getParish(50,this.offset,this.municipality!.id)
      .subscribe((response: IParish[]) => {
        this.parishs = response;
        this.loading = false;
      },(error: HttpErrorResponse) => {
        this.errorHandler.handleError(error);
      });

  }

}
