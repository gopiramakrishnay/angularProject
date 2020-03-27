import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeafsComponent } from './leafs.component';

describe('LeafsComponent', () => {
  let component: LeafsComponent;
  let fixture: ComponentFixture<LeafsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeafsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeafsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
