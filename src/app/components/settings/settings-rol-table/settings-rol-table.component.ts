import { Component, OnInit, Input } from '@angular/core';
import { IRol } from 'src/app/interfaces/IRol';

@Component({
  selector: 'settings-rol-table',
  templateUrl: './settings-rol-table.component.html',
  styleUrls: ['./settings-rol-table.component.scss']
})
export class SettingsRolTableComponent implements OnInit {

  @Input("rols") rols: IRol[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
