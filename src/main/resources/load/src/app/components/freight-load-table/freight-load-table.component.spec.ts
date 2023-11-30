import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreightLoadTableComponent } from './freight-load-table.component';

describe('FreightLoadTableComponent', () => {
  let component: FreightLoadTableComponent;
  let fixture: ComponentFixture<FreightLoadTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FreightLoadTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FreightLoadTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
