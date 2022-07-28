import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInstructionsModalComponent } from './edit-instructions-modal.component';

describe('EditInstructionsModalComponent', () => {
  let component: EditInstructionsModalComponent;
  let fixture: ComponentFixture<EditInstructionsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditInstructionsModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditInstructionsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
