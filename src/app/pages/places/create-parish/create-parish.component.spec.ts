import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateParishComponent } from './create-parish.component';

describe('CreateParishComponent', () => {
  let component: CreateParishComponent;
  let fixture: ComponentFixture<CreateParishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateParishComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateParishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
