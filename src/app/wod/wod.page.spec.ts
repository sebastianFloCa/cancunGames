import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WodPage } from './wod.page';

describe('WodPage', () => {
  let component: WodPage;
  let fixture: ComponentFixture<WodPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WodPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WodPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
