import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces/user.model';
import { UsersService } from 'src/app/services/users/users.service';
import { IStatus } from 'src/app/interfaces/IStatus';
import { StorageManager } from 'src/app/utils/StorageManager';
import { StatusService } from 'src/app/services/status/status.service';
import { RolsService } from 'src/app/services/rols/rols.service';
import { IRol } from 'src/app/interfaces/IRol';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlerService } from 'src/app/services/errorhandler/errorhandler.service';

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
    private rolsService: RolsService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit(): void {

    this.statusService.getStatues(0,10,this.offset).subscribe((response: IStatus[]) => {
      this.statues = response;
    },(error: HttpErrorResponse) => {
      this.errorHandler.handleError(error);
    });

    this.rolsService.getRoles(10,this.offset).subscribe((response: IRol[]) => {
      this.roles = response;
    },(error: HttpErrorResponse) => {
      this.errorHandler.handleError(error);
    });

    this.userService.getUsers(10,this.offset).subscribe((response: IUser[]) => {
      this.users = response;
      console.log(this.users)
      this.loading = false;
    },(error: HttpErrorResponse) => {
      this.errorHandler.handleError(error);
    });
  }

  changePagination(value: any){
    this.offset = <number>value;
    console.log(this.offset);

    this.statusService.getStatues(0,10,this.offset).subscribe((response: IStatus[]) => {
      this.statues = response;
    },(error: HttpErrorResponse) => {
      this.errorHandler.handleError(error);
    });

    this.rolsService.getRoles(10,this.offset).subscribe((response: IRol[]) => {
      this.roles = response;
    },(error: HttpErrorResponse) => {
      this.errorHandler.handleError(error);
    });

    this.userService.getUsers(10,this.offset).subscribe((response: IUser[]) => {
      this.users = response;
      console.log(this.users)
      this.loading = false;
    },(error: HttpErrorResponse) => {
      this.errorHandler.handleError(error);
    });
  }

  getSearch(value: any) {

    this.loading = true;
    this.users = [];
    const username: string = <string>value;

    if(username && username !== "") {
      this.userService.findUsers(username)
      .subscribe((response: IUser) => {
        this.users.push(response);
        this.loading = false;
      },(error: HttpErrorResponse) => {
        this.errorHandler.handleError(error);
        this.loading = false;
      });
    }else {

      this.userService.getUsers(10,this.offset).subscribe((response: IUser[]) => {
        this.users = response;
        console.log(this.users)
        this.loading = false;
      },(error: HttpErrorResponse) => {
        this.errorHandler.handleError(error);
      });
    }
  }

}
