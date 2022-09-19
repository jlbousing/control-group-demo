import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemakeProductionModalComponent } from './remake-production-modal.component';

describe('RemakeProductionModalComponent', () => {
  let component: RemakeProductionModalComponent;
  let fixture: ComponentFixture<RemakeProductionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemakeProductionModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemakeProductionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
