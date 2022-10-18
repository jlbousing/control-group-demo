import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RubrosTableComponent } from './rubros-table.component';

describe('RubrosTableComponent', () => {
  let component: RubrosTableComponent;
  let fixture: ComponentFixture<RubrosTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RubrosTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RubrosTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
