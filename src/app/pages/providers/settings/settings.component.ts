import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlerService } from 'src/app/services/errorhandler/errorhandler.service';
import { Dialog } from '@angular/cdk/dialog';
import { Router } from '@angular/router';
import { SuppliersService } from 'src/app/services/suppliers/suppliers.service';
import { ISupplier } from 'src/app/interfaces/ISupplier';
import { ISupplierRequest } from 'src/app/interfaces/ISupplierRequest';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(
    private dialog: Dialog,
    private router: Router,
    private route: ActivatedRoute,
    private supplierService: SuppliersService
  ) { }

  ngOnInit(): void {
  }

}
