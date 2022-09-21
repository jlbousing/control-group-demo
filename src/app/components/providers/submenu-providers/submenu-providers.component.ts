import { Component, OnInit } from '@angular/core';
import { StorageManager } from 'src/app/utils/StorageManager';

@Component({
  selector: 'submenu-providers',
  templateUrl: './submenu-providers.component.html',
  styleUrls: ['./submenu-providers.component.scss']
})
export class SubmenuProvidersComponent implements OnInit {

  supplierId: string | null = null;
  constructor() {
    this.supplierId = StorageManager.getFromLocalStorage("supplierId");
  }

  ngOnInit(): void {
  }

}
