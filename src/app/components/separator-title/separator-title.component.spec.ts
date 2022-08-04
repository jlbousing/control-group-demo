import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeparatorTitleComponent } from './separator-title.component';

describe('SeparatorTitleComponent', () => {
  let component: SeparatorTitleComponent;
  let fixture: ComponentFixture<SeparatorTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeparatorTitleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeparatorTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
