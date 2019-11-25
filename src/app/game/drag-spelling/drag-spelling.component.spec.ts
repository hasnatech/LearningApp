import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DragSpellingComponent } from './drag-spelling.component';

describe('DragSpellingComponent', () => {
  let component: DragSpellingComponent;
  let fixture: ComponentFixture<DragSpellingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DragSpellingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DragSpellingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
