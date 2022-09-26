import { Component, OnInit, Input, INJECTOR } from '@angular/core';
import { IMunicipality } from 'src/app/interfaces/IMunicipality';

@Component({
  selector: 'municipalitie-table',
  templateUrl: './municipalitie-table.component.html',
  styleUrls: ['./municipalitie-table.component.scss']
})
export class MunicipalitieTableComponent implements OnInit {

  @Input("municipalities") municipalities: IMunicipality[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  selectView(municipality: IMunicipality) {

  }

  selectEdit(municipality: IMunicipality) {

  }

}
