import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditParishModalComponent } from './edit-parish-modal.component';

describe('EditParishModalComponent', () => {
  let component: EditParishModalComponent;
  let fixture: ComponentFixture<EditParishModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditParishModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditParishModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
