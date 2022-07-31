import { Injectable } from '@angular/core';
import { filter, map, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class TitleServicesService {

  default_title: string = "";

  constructor(
    public title: Title
  ) { }

  pageTitle(){
  }
}
