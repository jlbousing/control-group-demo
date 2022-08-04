import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'separator-title',
  templateUrl: './separator-title.component.html',
  styleUrls: ['./separator-title.component.scss']
})
export class SeparatorTitleComponent implements OnInit {

  @Input('title') title: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
