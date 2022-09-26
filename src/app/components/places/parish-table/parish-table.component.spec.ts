import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParishTableComponent } from './parish-table.component';

describe('ParishTableComponent', () => {
  let component: ParishTableComponent;
  let fixture: ComponentFixture<ParishTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParishTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParishTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
