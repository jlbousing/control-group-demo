import { Component, OnInit } from '@angular/core';
import { ITemplate } from 'src/app/interfaces/ITemplate';
import { IAssignament } from 'src/app/interfaces/IAssignament';
import { ISupplier } from 'src/app/interfaces/ISupplier';
import { SuppliersService } from 'src/app/services/suppliers/suppliers.service';
import { AssignamentService } from 'src/app/services/assignaments/assignament.service';
import { ErrorHandlerService } from 'src/app/services/errorhandler/errorhandler.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { AccessService } from 'src/app/services/access/access.service';
import { TemplateService } from 'src/app/services/templates/template.service';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent implements OnInit {

  supplierId: number = 0;
  templates: ITemplate[] = []
  assignaments: IAssignament[] = [];
  assignamentId: number = 0;
  assignament: IAssignament | null = null;

  loading: boolean = true;

  supplier: ISupplier | null = null;

  constructor(
    private supplierService: SuppliersService,
    private assignamentService: AssignamentService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    public accessService: AccessService,
    private templateService: TemplateService
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.supplierId = params['supplierId'];

      this.supplierService.findSupplierById(this.supplierId)
        .subscribe((response: ISupplier) => {
          this.supplier = response
        },(error: HttpErrorResponse) => {
          this.errorHandler.handleError(error);
          this.loading = false;
        })

        this.supplierService.findSupplierById(this.supplierId)
        .subscribe((response: ISupplier) => {

          this.assignamentService.getAssignamentsByCompany(response.companyData.id)
            .subscribe((response: IAssignament[]) => {
                this.assignaments = response;
                this.loading = false;
            },(error: HttpErrorResponse) => {
              this.errorHandler.handleError(error);
              this.loading = false;
            });
        },(error: HttpErrorResponse) => {
          this.errorHandler.handleError(error);
          this.loading = false;
        });
    })
  }

  setAssignament(value: any) {
    this.templates = [];
    let assignament = <IAssignament> value;
    this.assignament = assignament;

    this.templateService.getTemplates(this.assignament.id)
      .subscribe((response: ITemplate[]) => {
        this.templates = response;
      },(error: HttpErrorResponse) => {
        this.errorHandler.handleError(error);
        this.loading = false;
      });
  }

  getSearch(value: any) {

  }

}
