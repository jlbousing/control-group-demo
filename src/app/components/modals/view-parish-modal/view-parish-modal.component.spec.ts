import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewParishModalComponent } from './view-parish-modal.component';

describe('ViewParishModalComponent', () => {
  let component: ViewParishModalComponent;
  let fixture: ComponentFixture<ViewParishModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewParishModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewParishModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
