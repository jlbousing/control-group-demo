import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnDispatchModalComponent } from './return-dispatch-modal.component';

describe('ReturnDispatchModalComponent', () => {
  let component: ReturnDispatchModalComponent;
  let fixture: ComponentFixture<ReturnDispatchModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReturnDispatchModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReturnDispatchModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
