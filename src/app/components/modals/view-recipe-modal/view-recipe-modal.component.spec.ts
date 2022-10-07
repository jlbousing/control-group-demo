import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRecipeModalComponent } from './view-recipe-modal.component';

describe('ViewRecipeModalComponent', () => {
  let component: ViewRecipeModalComponent;
  let fixture: ComponentFixture<ViewRecipeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewRecipeModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewRecipeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
