import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAssignmentsComponent } from './create-assignments.component';

describe('CreateAssignmentsComponent', () => {
  let component: CreateAssignmentsComponent;
  let fixture: ComponentFixture<CreateAssignmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAssignmentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAssignmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
