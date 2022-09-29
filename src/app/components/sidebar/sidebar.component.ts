import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { TitleServicesService } from 'src/app/services/title/title-services.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

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
    public title: Title,
    private breakpointObserver: BreakpointObserver,
  ) { }

  ngOnInit(): void {
    console.log(this.title.getTitle())

    this.breakpointObserver.observe([
      "(max-width: 768px)"
    ]).subscribe((result: BreakpointState) => {
      if (result.matches) {
          this.isOpen = false;
      } else {
          // show stuff
          this.isOpen = true;
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
  }

  buttonSideMenu(): void {
    this.isOpen = !this.isOpen;
  }

}
