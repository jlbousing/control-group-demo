import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BartchartAssignamentsComponent } from './bartchart-assignaments.component';

describe('BartchartAssignamentsComponent', () => {
  let component: BartchartAssignamentsComponent;
  let fixture: ComponentFixture<BartchartAssignamentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BartchartAssignamentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BartchartAssignamentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
