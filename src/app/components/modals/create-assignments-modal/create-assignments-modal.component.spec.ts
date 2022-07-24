import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAssignmentsModalComponent } from './create-assignments-modal.component';

describe('CreateAssignmentsModalComponent', () => {
  let component: CreateAssignmentsModalComponent;
  let fixture: ComponentFixture<CreateAssignmentsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAssignmentsModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAssignmentsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
