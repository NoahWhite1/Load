import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreightIndividualDisplayComponent } from './freight-individual-display.component';

describe('FreightIndividualDisplayComponent', () => {
  let component: FreightIndividualDisplayComponent;
  let fixture: ComponentFixture<FreightIndividualDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FreightIndividualDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FreightIndividualDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
