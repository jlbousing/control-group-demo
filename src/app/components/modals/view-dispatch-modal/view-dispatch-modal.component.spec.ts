import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDispatchModalComponent } from './view-dispatch-modal.component';

describe('ViewDispatchModalComponent', () => {
  let component: ViewDispatchModalComponent;
  let fixture: ComponentFixture<ViewDispatchModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDispatchModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewDispatchModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
