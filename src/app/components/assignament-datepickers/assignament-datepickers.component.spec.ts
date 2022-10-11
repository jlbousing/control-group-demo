import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignamentDatepickersComponent } from './assignament-datepickers.component';

describe('AssignamentDatepickersComponent', () => {
  let component: AssignamentDatepickersComponent;
  let fixture: ComponentFixture<AssignamentDatepickersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignamentDatepickersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignamentDatepickersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
