import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProductionModalComponent } from './view-production-modal.component';

describe('ViewProductionModalComponent', () => {
  let component: ViewProductionModalComponent;
  let fixture: ComponentFixture<ViewProductionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewProductionModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewProductionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
