import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAssignmentsModalComponent } from './view-assignments-modal.component';

describe('ViewAssignmentsModalComponent', () => {
  let component: ViewAssignmentsModalComponent;
  let fixture: ComponentFixture<ViewAssignmentsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAssignmentsModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAssignmentsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
