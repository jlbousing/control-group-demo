import { Component, OnInit, Input } from '@angular/core';
import { AccessService } from 'src/app/services/access/access.service';

@Component({
  selector: 'submenu-assignaments',
  templateUrl: './submenu-assignaments.component.html',
  styleUrls: ['./submenu-assignaments.component.scss']
})
export class SubmenuAssignamentsComponent implements OnInit {

  @Input("companyId") companyId: number = 0;

  constructor(public accessService: AccessService) { }

  ngOnInit(): void {
  }

}
