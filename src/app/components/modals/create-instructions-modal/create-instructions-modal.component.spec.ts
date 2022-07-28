import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInstructionsModalComponent } from './create-instructions-modal.component';

describe('CreateInstructionsModalComponent', () => {
  let component: CreateInstructionsModalComponent;
  let fixture: ComponentFixture<CreateInstructionsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateInstructionsModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateInstructionsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
