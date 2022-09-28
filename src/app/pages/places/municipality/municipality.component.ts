import { Component, OnInit } from '@angular/core';
import { IMunicipality } from 'src/app/interfaces/IMunicipality';
import { IState } from 'src/app/interfaces/IState';
import { StateService } from 'src/app/services/states/state.service';
import { MunicipalityService } from 'src/app/services/municipality/municipality.service';

@Component({
  selector: 'app-municipality',
  templateUrl: './municipality.component.html',
  styleUrls: ['./municipality.component.scss']
})
export class MunicipalityComponent implements OnInit {

  states: IState[] = [];
  state: IState | null = null;
  municipalities: IMunicipality[] = [];

  loading: boolean = true;

  offset: number = 0;

  constructor(
    private stateService: StateService,
    private municipalityService: MunicipalityService
  ) { }

  ngOnInit(): void {

    this.stateService.getStates(50,0)
      .subscribe((response: IState[]) => {
        this.states = response;
        this.loading = false;
      })
  }

  setState(value: any) {

    this.offset = 0;
    this.loading = true;
    this.state = <IState>value;

    this.municipalityService.getMunicipality(50,this.offset,this.state.id)
      .subscribe((response: IMunicipality[]) => {
        this.municipalities = response;
        this.loading = false;
      });
  }

  changePagination(value: any) {

    this.offset = <number>value;

    this.municipalityService.getMunicipality(50,this.offset,this.state!.id)
      .subscribe((response: IMunicipality[]) => {
        this.municipalities = response;
        this.loading = false;
      });

  }

}
