import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'back-link',
  templateUrl: './back-link.component.html',
  styleUrls: ['./back-link.component.scss']
})
export class BackLinkComponent implements OnInit {

  @Input("route") route: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
