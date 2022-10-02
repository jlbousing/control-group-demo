import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'load-more',
  templateUrl: './load-more.component.html',
  styleUrls: ['./load-more.component.scss']
})
export class LoadMoreComponent implements OnInit {

  @Input("isDisable") isDisable: boolean = false;
  @Input("offset") offset: number = 0;

  @Output() changePagination = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  changeOffset(){
    this.offset += 10;
    this.changePagination.emit(this.offset);
  }

}
