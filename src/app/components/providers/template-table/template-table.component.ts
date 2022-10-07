import { Component, OnInit, Input } from '@angular/core';
import { ITemplate } from 'src/app/interfaces/ITemplate';

@Component({
  selector: 'template-table',
  templateUrl: './template-table.component.html',
  styleUrls: ['./template-table.component.scss']
})
export class TemplateTableComponent implements OnInit {

  @Input("templates") templates: ITemplate[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  selectEdit(template: ITemplate) {

  }

  selectView(template: ITemplate) {

  }

}
