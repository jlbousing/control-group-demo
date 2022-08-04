import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarUserInfoComponent } from './sidebar-user-info.component';

describe('SidebarUserInfoComponent', () => {
  let component: SidebarUserInfoComponent;
  let fixture: ComponentFixture<SidebarUserInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarUserInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarUserInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
