import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRubroModalComponent } from './edit-rubro-modal.component';

describe('EditRubroModalComponent', () => {
  let component: EditRubroModalComponent;
  let fixture: ComponentFixture<EditRubroModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditRubroModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditRubroModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
