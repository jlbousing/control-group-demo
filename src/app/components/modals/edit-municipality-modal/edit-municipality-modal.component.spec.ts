import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMunicipalityModalComponent } from './edit-municipality-modal.component';

describe('EditMunicipalityModalComponent', () => {
  let component: EditMunicipalityModalComponent;
  let fixture: ComponentFixture<EditMunicipalityModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMunicipalityModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditMunicipalityModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
