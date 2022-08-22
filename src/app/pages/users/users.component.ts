import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces/user.model';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: IUser[] = [];

  constructor(private userService: UsersService) { }

  ngOnInit(): void {

    this.userService.getUsers().subscribe((response: IUser[]) => {
      this.users = response;
      console.log(this.users)
    })
  }

}
