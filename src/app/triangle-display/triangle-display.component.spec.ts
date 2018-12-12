import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TriangleDisplayComponent } from './triangle-display.component';

describe('TriangleDisplayComponent', () => {
  let component: TriangleDisplayComponent;
  let fixture: ComponentFixture<TriangleDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TriangleDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TriangleDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
