import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRubroComponent } from './create-rubro.component';

describe('CreateRubroComponent', () => {
  let component: CreateRubroComponent;
  let fixture: ComponentFixture<CreateRubroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateRubroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateRubroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
