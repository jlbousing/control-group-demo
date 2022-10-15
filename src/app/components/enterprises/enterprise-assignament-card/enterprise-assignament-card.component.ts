import { Component, OnInit, Input} from '@angular/core';
import { ICompany } from 'src/app/interfaces/ICompanies';
import { Router } from '@angular/router';

@Component({
  selector: 'enterprise-assignament-card',
  templateUrl: './enterprise-assignament-card.component.html',
  styleUrls: ['./enterprise-assignament-card.component.scss']
})
export class EnterpriseAssignamentCardComponent implements OnInit {

  @Input('company') company: ICompany | null = null;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToProviders(company: ICompany)
  {
    this.router.navigate(['/dashboard/assignaments-list/', company.id]);
  }

}
