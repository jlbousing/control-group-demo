import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStateModalComponent } from './view-state-modal.component';

describe('ViewStateModalComponent', () => {
  let component: ViewStateModalComponent;
  let fixture: ComponentFixture<ViewStateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewStateModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewStateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
