import { Component, OnInit, Input } from '@angular/core';
import { ITemplate } from 'src/app/interfaces/ITemplate';
import { Dialog } from '@angular/cdk/dialog';
import { ViewTemplateModalComponent } from '../../modals/view-template-modal/view-template-modal.component';

@Component({
  selector: 'template-table',
  templateUrl: './template-table.component.html',
  styleUrls: ['./template-table.component.scss']
})
export class TemplateTableComponent implements OnInit {

  @Input("templates") templates: ITemplate[] = [];

  constructor(
    private dialog: Dialog
  ) { }

  ngOnInit(): void {
  }

  selectEdit(template: ITemplate) {

  }

  selectView(template: ITemplate) {

    this.dialog.open(ViewTemplateModalComponent,{
      data: {
        template: template
      }
    });
  }

}
