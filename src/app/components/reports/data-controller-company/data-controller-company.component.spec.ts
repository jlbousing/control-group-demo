import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataControllerCompanyComponent } from './data-controller-company.component';

describe('DataControllerCompanyComponent', () => {
  let component: DataControllerCompanyComponent;
  let fixture: ComponentFixture<DataControllerCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataControllerCompanyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataControllerCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
