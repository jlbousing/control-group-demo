import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DinamicTitleIconComponent } from './dinamic-title-icon.component';

describe('DinamicTitleIconComponent', () => {
  let component: DinamicTitleIconComponent;
  let fixture: ComponentFixture<DinamicTitleIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DinamicTitleIconComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DinamicTitleIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
