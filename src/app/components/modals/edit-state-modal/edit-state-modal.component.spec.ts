import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStateModalComponent } from './edit-state-modal.component';

describe('EditStateModalComponent', () => {
  let component: EditStateModalComponent;
  let fixture: ComponentFixture<EditStateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditStateModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditStateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
