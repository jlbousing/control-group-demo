import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ISupplier } from 'src/app/interfaces/ISupplier';

@Component({
  selector: 'app-provider-page',
  templateUrl: './provider-page.component.html',
  styleUrls: ['./provider-page.component.scss']
})
export class ProviderPageComponent implements OnInit {

  suppliers: ISupplier[] = [];

  constructor(private location: Location) { }

  ngOnInit(): void {

  }

}
