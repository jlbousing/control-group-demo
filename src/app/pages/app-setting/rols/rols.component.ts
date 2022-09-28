import { Component, OnInit } from '@angular/core';
import { RolsService } from 'src/app/services/rols/rols.service';
import { IRol } from 'src/app/interfaces/IRol';

@Component({
  selector: 'app-rols',
  templateUrl: './rols.component.html',
  styleUrls: ['./rols.component.scss']
})
export class RolsComponent implements OnInit {

  loading: boolean = true;

  rols: IRol[] = [];

  offset: number = 0;

  constructor(
    private rolService: RolsService
  ) { }

  ngOnInit(): void {

    this.rolService.getRoles(50,this.offset)
      .subscribe((response: IRol[]) => {
        this.rols = response;
      });
  }

}
