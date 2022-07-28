import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDispatchModalComponent } from './create-dispatch-modal.component';

describe('CreateDispatchModalComponent', () => {
  let component: CreateDispatchModalComponent;
  let fixture: ComponentFixture<CreateDispatchModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateDispatchModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateDispatchModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
