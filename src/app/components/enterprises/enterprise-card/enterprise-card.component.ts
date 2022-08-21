import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'enterprise-card',
  templateUrl: './enterprise-card.component.html',
  styleUrls: ['./enterprise-card.component.scss']
})
export class EnterpriseCardComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToProviders()
  {
    this.router.navigateByUrl('/providers')
  }

}
