import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadCalculatorPageComponent } from './load-calculator-page.component';

describe('LoadCalculatorPageComponent', () => {
  let component: LoadCalculatorPageComponent;
  let fixture: ComponentFixture<LoadCalculatorPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadCalculatorPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadCalculatorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
