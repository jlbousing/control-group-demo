import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ICompany } from 'src/app/interfaces/ICompanies';

@Component({
  selector: 'enterprise-card',
  templateUrl: './enterprise-card.component.html',
  styleUrls: ['./enterprise-card.component.scss']
})
export class EnterpriseCardComponent implements OnInit {

  @Input('company') company: ICompany | null = null;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToProviders()
  {
    this.router.navigateByUrl('/providers')
  }

}
