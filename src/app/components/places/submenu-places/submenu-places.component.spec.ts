import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmenuPlacesComponent } from './submenu-places.component';

describe('SubmenuPlacesComponent', () => {
  let component: SubmenuPlacesComponent;
  let fixture: ComponentFixture<SubmenuPlacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmenuPlacesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmenuPlacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
