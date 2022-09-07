import { Component, OnInit, Input } from '@angular/core';
import { ISupplier } from 'src/app/interfaces/ISupplier';
import { ICompany } from 'src/app/interfaces/ICompanies';
import { Router } from '@angular/router';

@Component({
  selector: 'provider-card',
  templateUrl: './provider-card.component.html',
  styleUrls: ['./provider-card.component.scss']
})
export class ProviderCardComponent implements OnInit {

  @Input("supplier") supplier: ISupplier | null = null;
  @Input("company") company: ICompany | null = null;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToProvidersDetail(supplierId: number)
  {
    this.router.navigateByUrl(`providers/assignments/${supplierId}`)
  }

}
