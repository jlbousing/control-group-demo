import { Component, OnInit, Input } from '@angular/core';
import { IUser } from 'src/app/interfaces/user.model';

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
