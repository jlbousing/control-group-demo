import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignamentsReportComponent } from './assignaments-report.component';

describe('AssignamentsReportComponent', () => {
  let component: AssignamentsReportComponent;
  let fixture: ComponentFixture<AssignamentsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignamentsReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignamentsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
