import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSettingsCategoryModalComponent } from './edit-settings-category-modal.component';

describe('EditSettingsCategoryModalComponent', () => {
  let component: EditSettingsCategoryModalComponent;
  let fixture: ComponentFixture<EditSettingsCategoryModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSettingsCategoryModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSettingsCategoryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
