import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProductionModalComponent } from './create-production-modal.component';

describe('CreateProductionModalComponent', () => {
  let component: CreateProductionModalComponent;
  let fixture: ComponentFixture<CreateProductionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateProductionModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateProductionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
