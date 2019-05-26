import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BenchmarkPage } from './benchmark.page';

describe('BenchmarkPage', () => {
  let component: BenchmarkPage;
  let fixture: ComponentFixture<BenchmarkPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BenchmarkPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BenchmarkPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
