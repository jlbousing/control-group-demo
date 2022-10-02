import { Component, OnInit } from '@angular/core';
import { AccessService } from 'src/app/services/access/access.service';

@Component({
  selector: 'submenu-settings',
  templateUrl: './submenu-settings.component.html',
  styleUrls: ['./submenu-settings.component.scss']
})
export class SubmenuSettingsComponent implements OnInit {

  constructor(
    public accessService: AccessService
  ) { }

  ngOnInit(): void {
  }

}
