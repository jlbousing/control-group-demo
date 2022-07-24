import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmenuProvidersComponent } from './submenu-providers.component';

describe('SubmenuProvidersComponent', () => {
  let component: SubmenuProvidersComponent;
  let fixture: ComponentFixture<SubmenuProvidersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmenuProvidersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmenuProvidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
