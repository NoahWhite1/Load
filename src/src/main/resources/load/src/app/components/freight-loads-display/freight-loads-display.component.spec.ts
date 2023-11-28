import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreightLoadsDisplayComponent } from './freight-loads-display.component';

describe('FreightLoadsDisplayComponent', () => {
  let component: FreightLoadsDisplayComponent;
  let fixture: ComponentFixture<FreightLoadsDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FreightLoadsDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FreightLoadsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
