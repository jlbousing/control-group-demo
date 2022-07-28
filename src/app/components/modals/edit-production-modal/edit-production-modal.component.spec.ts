import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProductionModalComponent } from './edit-production-modal.component';

describe('EditProductionModalComponent', () => {
  let component: EditProductionModalComponent;
  let fixture: ComponentFixture<EditProductionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProductionModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditProductionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
