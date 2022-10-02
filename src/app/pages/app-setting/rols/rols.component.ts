import { Component, OnInit } from '@angular/core';
import { RolsService } from 'src/app/services/rols/rols.service';
import { IRol } from 'src/app/interfaces/IRol';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlerService } from 'src/app/services/errorhandler/errorhandler.service';


@Component({
  selector: 'app-rols',
  templateUrl: './rols.component.html',
  styleUrls: ['./rols.component.scss']
})
export class RolsComponent implements OnInit {

  loading: boolean = true;

  rols: IRol[] = [];

  offset: number = 0;

  constructor(
    private rolService: RolsService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit(): void {

    this.rolService.getRoles(10,this.offset)
      .subscribe((response: IRol[]) => {
        this.rols = response;
      },(error: HttpErrorResponse) => {
        this.errorHandler.handleError(error);
      });
  }

}
