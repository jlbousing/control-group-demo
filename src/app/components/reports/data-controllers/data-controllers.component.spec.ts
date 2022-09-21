import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataControllersComponent } from './data-controllers.component';

describe('DataControllersComponent', () => {
  let component: DataControllersComponent;
  let fixture: ComponentFixture<DataControllersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataControllersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataControllersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
