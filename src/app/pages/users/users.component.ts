import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces/user.model';
import { UsersService } from 'src/app/services/users/users.service';
import { IStatus } from 'src/app/interfaces/IStatus';
import { StorageManager } from 'src/app/utils/StorageManager';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: IUser[] = [];
  statues: IStatus[] = [];

  constructor(
    private userService: UsersService,
  ) { }

  ngOnInit(): void {

    this.statues = StorageManager.getFromLocalStorage("statues");
    console.log("mostrando statues ",this.statues)

    this.userService.getUsers().subscribe((response: IUser[]) => {
      this.users = response;
      console.log(this.users)
    })
  }

}
