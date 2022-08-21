import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'provider-card',
  templateUrl: './provider-card.component.html',
  styleUrls: ['./provider-card.component.scss']
})
export class ProviderCardComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToProvidersDetail()
  {
    this.router.navigateByUrl('providers/assignments')
  }

}
