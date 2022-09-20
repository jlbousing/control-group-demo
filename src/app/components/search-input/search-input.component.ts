import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit {

  @Input("label") label: string = "";
  @Input("placeholder") placeholder: string = "";
  @Output() searching: EventEmitter<string> = new EventEmitter();

  _search: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  search(){
    this.searching.emit(this._search);
  }

}
