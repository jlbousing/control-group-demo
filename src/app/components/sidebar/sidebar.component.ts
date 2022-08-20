import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { TitleServicesService } from 'src/app/services/title/title-services.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnChanges{

  isOpen: boolean = true;
  currentTitle: string = "";

  constructor(
    private titleServices: TitleServicesService,
    public router: Router,
    public activatedRouter: ActivatedRoute,
    public title: Title
  ) { }

  ngOnInit(): void {
    console.log(this.title.getTitle())
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
  }

  buttonSideMenu(): void {
    this.isOpen = !this.isOpen;
  }

}
