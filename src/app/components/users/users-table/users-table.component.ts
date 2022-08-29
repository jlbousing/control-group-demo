import { Component, OnInit, Input } from '@angular/core';
import { IUser } from 'src/app/interfaces/user.model';
import { StoreGlobalInformation } from 'src/app/global/StoreGlobalInformation';
import { IStatus } from 'src/app/interfaces/IStatus';
import { IRol } from 'src/app/interfaces/IRol';
import { Dialog } from '@angular/cdk/dialog';
import { EditUsersModalComponent } from '../../modals/edit-users-modal/edit-users-modal.component';

@Component({
  selector: 'users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements OnInit {

  @Input('users') users: IUser[] = [];
  @Input('statues') statues: IStatus[] = [];
  @Input('roles') roles: IRol[] = [];

  constructor(
    private dialog: Dialog
    ) { }

  ngOnInit(): void {
  }

  showEditUser(user: IUser){
    this.dialog.open(EditUsersModalComponent,{
      data: {
        user: user,
        roles: this.roles,
        statues: this.statues
      }
    })
  }

}
