import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmenuAssignamentsComponent } from './submenu-assignaments.component';

describe('SubmenuAssignamentsComponent', () => {
  let component: SubmenuAssignamentsComponent;
  let fixture: ComponentFixture<SubmenuAssignamentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmenuAssignamentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmenuAssignamentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
