import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces/user.model';
import { UsersService } from 'src/app/services/users/users.service';
import { IStatus } from 'src/app/interfaces/IStatus';
import { StorageManager } from 'src/app/utils/StorageManager';
import { StatusService } from 'src/app/services/status/status.service';
import { RolsService } from 'src/app/services/rols/rols.service';
import { IRol } from 'src/app/interfaces/IRol';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: IUser[] = [];
  roles: IRol[] = [];
  statues: IStatus[] = [];

  loading: boolean = true;

  offset: number = 0;

  constructor(
    private userService: UsersService,
    private statusService: StatusService,
    private rolsService: RolsService
  ) { }

  ngOnInit(): void {

    //this.statues = StorageManager.getFromLocalStorage("statues");
    //console.log("mostrando statues ",this.statues)

    this.statusService.getStatues(0,50,this.offset).subscribe((response: IStatus[]) => this.statues = response);

    this.rolsService.getRoles(50,this.offset).subscribe((response: IRol[]) => this.roles = response);

    this.userService.getUsers(1,50,this.offset).subscribe((response: IUser[]) => {
      this.users = response;
      console.log(this.users)
      this.loading = false;
    });
  }

  changePagination(value: any){
    this.offset = <number>value;
    console.log(this.offset);

    this.statusService.getStatues(0,50,this.offset).subscribe((response: IStatus[]) => this.statues = response);

    this.rolsService.getRoles(50,this.offset).subscribe((response: IRol[]) => this.roles = response);

    this.userService.getUsers(1,50,this.offset).subscribe((response: IUser[]) => {
      this.users = response;
      console.log(this.users)
      this.loading = false;
    });
  }

}
