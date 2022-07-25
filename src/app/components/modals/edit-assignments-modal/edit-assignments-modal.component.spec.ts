import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAssignmentsModalComponent } from './edit-assignments-modal.component';

describe('EditAssignmentsModalComponent', () => {
  let component: EditAssignmentsModalComponent;
  let fixture: ComponentFixture<EditAssignmentsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAssignmentsModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAssignmentsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
