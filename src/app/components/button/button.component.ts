import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'custom-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class CustomButtonComponent implements OnInit {

  @Input("text") text!: string;
  @Input("disable") isDisable: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
