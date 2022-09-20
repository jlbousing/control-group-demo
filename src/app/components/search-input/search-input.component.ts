import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit {

  @Output() searching: EventEmitter<string> = new EventEmitter();

  _search: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  search(){
    this.searching.emit(this._search);
  }

}
