import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmenuUsersComponent } from './submenu-users.component';

describe('SubmenuUsersComponent', () => {
  let component: SubmenuUsersComponent;
  let fixture: ComponentFixture<SubmenuUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmenuUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmenuUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
