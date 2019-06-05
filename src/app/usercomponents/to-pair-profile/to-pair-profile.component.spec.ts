import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToPairProfileComponent } from './to-pair-profile.component';

describe('ToPairProfileComponent', () => {
  let component: ToPairProfileComponent;
  let fixture: ComponentFixture<ToPairProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToPairProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToPairProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
