import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'home-cards',
  templateUrl: './home-cards.component.html',
  styleUrls: ['./home-cards.component.scss']
})
export class HomeCardsComponent implements OnInit {

  @Input("title") title: string = "";
  @Input('body') body: string = "";
  @Input('type') type: string = "";

  constructor() { }

  ngOnInit(): void {
  }

}
