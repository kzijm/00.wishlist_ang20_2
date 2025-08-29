import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormSimpleComponent } from './dynamic-form-simple.component';

describe('DynamicFormSimpleComponent', () => {
  let component: DynamicFormSimpleComponent;
  let fixture: ComponentFixture<DynamicFormSimpleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DynamicFormSimpleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicFormSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
