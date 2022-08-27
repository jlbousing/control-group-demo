import { Component, OnInit, Input } from '@angular/core';
import { IUser } from 'src/app/interfaces/user.model';
import { StoreGlobalInformation } from 'src/app/global/StoreGlobalInformation';
import { IStatus } from 'src/app/interfaces/IStatus';

@Component({
  selector: 'users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements OnInit {

  @Input('users') users: IUser[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
