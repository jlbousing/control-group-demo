import { Component, OnInit } from '@angular/core';
import { AccessService } from 'src/app/services/access/access.service';

@Component({
  selector: 'submenu-users',
  templateUrl: './submenu-users.component.html',
  styleUrls: ['./submenu-users.component.scss']
})
export class SubmenuUsersComponent implements OnInit {

  constructor(
    public accessService: AccessService
  ) { }

  ngOnInit(): void {
  }

}
