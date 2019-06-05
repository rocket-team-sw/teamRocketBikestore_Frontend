import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToPairMenuComponent } from './to-pair-menu.component';

describe('ToPairMenuComponent', () => {
  let component: ToPairMenuComponent;
  let fixture: ComponentFixture<ToPairMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToPairMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToPairMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
