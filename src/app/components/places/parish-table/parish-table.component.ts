import { Component, OnInit, Input } from '@angular/core';
import { IParish } from 'src/app/interfaces/IParish';
import { IMunicipality } from 'src/app/interfaces/IMunicipality';

@Component({
  selector: 'parish-table',
  templateUrl: './parish-table.component.html',
  styleUrls: ['./parish-table.component.scss']
})
export class ParishTableComponent implements OnInit {


  @Input("parishs") parishs: IParish[] = [];
  @Input("municipality") municipality: IMunicipality | null = null;

  constructor() { }

  ngOnInit(): void {
  }

  selectView(parish: IParish) {

  }

  selectEdit(parish: IParish) {

  }

}
