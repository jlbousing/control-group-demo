import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsRolTableComponent } from './settings-rol-table.component';

describe('SettingsRolTableComponent', () => {
  let component: SettingsRolTableComponent;
  let fixture: ComponentFixture<SettingsRolTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsRolTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsRolTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
