import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiechartAssignamentsComponent } from './piechart-assignaments.component';

describe('PiechartAssignamentsComponent', () => {
  let component: PiechartAssignamentsComponent;
  let fixture: ComponentFixture<PiechartAssignamentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PiechartAssignamentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PiechartAssignamentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
