import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmenuSettingsComponent } from './submenu-settings.component';

describe('SubmenuSettingsComponent', () => {
  let component: SubmenuSettingsComponent;
  let fixture: ComponentFixture<SubmenuSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmenuSettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmenuSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
