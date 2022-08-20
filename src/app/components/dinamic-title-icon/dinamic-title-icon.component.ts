import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IIconTitleList } from 'src/app/interfaces/IIConTitleList';
import { iconTitleList } from 'src/app/utils/IconTitleList';

@Component({
  selector: 'dinamic-title-icon',
  templateUrl: './dinamic-title-icon.component.html',
  styleUrls: ['./dinamic-title-icon.component.scss']
})
export class DinamicTitleIconComponent implements OnInit, OnChanges {

  @Input("title") title: string = "";
  currentTitle: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.currentTitle = this.getCurrentIcon(this.title)
  }

  getCurrentIcon(title: string) {

    var className: any = "";

    className = iconTitleList.find((item: IIconTitleList) => {
      return item.title === title;
    })?.iconClass;

    return className;
  }

}
