import { Component, OnInit, Input } from '@angular/core';
import { ITemplate } from 'src/app/interfaces/ITemplate';
import { Dialog } from '@angular/cdk/dialog';
import { ViewTemplateModalComponent } from '../../modals/view-template-modal/view-template-modal.component';
import { EditTemplateModalComponent } from '../../modals/edit-template-modal/edit-template-modal.component';

@Component({
  selector: 'template-table',
  templateUrl: './template-table.component.html',
  styleUrls: ['./template-table.component.scss']
})
export class TemplateTableComponent implements OnInit {

  @Input("templates") templates: ITemplate[] = [];
  @Input("supplierId") supplierId: number | null = 0;

  constructor(
    private dialog: Dialog
  ) { }

  ngOnInit(): void {
  }

  selectEdit(template: ITemplate) {

    this.dialog.open(EditTemplateModalComponent,{
      data: {
        template: template,
        supplierId: this.supplierId
      }
    });
  }

  selectView(template: ITemplate) {

    this.dialog.open(ViewTemplateModalComponent,{
      data: {
        template: template
      }
    });
  }

}
