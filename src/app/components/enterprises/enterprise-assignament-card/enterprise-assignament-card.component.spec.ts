import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterpriseAssignamentCardComponent } from './enterprise-assignament-card.component';

describe('EnterpriseAssignamentCardComponent', () => {
  let component: EnterpriseAssignamentCardComponent;
  let fixture: ComponentFixture<EnterpriseAssignamentCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnterpriseAssignamentCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnterpriseAssignamentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
