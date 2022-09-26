import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MunicipalitieTableComponent } from './municipalitie-table.component';

describe('MunicipalitieTableComponent', () => {
  let component: MunicipalitieTableComponent;
  let fixture: ComponentFixture<MunicipalitieTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MunicipalitieTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MunicipalitieTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
