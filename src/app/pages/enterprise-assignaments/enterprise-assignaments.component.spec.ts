import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterpriseAssignamentsComponent } from './enterprise-assignaments.component';

describe('EnterpriseAssignamentsComponent', () => {
  let component: EnterpriseAssignamentsComponent;
  let fixture: ComponentFixture<EnterpriseAssignamentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnterpriseAssignamentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnterpriseAssignamentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
