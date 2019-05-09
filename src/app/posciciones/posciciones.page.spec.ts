import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoscicionesPage } from './posciciones.page';

describe('PoscicionesPage', () => {
  let component: PoscicionesPage;
  let fixture: ComponentFixture<PoscicionesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoscicionesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoscicionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
