import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsCategoriesTableComponent } from './settings-categories-table.component';

describe('SettingsCategoriesTableComponent', () => {
  let component: SettingsCategoriesTableComponent;
  let fixture: ComponentFixture<SettingsCategoriesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsCategoriesTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsCategoriesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
