import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationTypeaheadComponent } from './location-typeahead.component';

describe('LocationTypeaheadComponent', () => {
  let component: LocationTypeaheadComponent;
  let fixture: ComponentFixture<LocationTypeaheadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationTypeaheadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationTypeaheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
