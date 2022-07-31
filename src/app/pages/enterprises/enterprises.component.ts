import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enterprises',
  templateUrl: './enterprises.component.html',
  styleUrls: ['./enterprises.component.scss']
})
export class EnterprisesComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToProviders()
  {
    this.router.navigateByUrl('providers/assignments')
  }

}
