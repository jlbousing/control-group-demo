import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMunicipalityModalComponent } from './view-municipality-modal.component';

describe('ViewMunicipalityModalComponent', () => {
  let component: ViewMunicipalityModalComponent;
  let fixture: ComponentFixture<ViewMunicipalityModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMunicipalityModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewMunicipalityModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
