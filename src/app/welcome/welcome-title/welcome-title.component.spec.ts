import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeTitleComponent } from './welcome-title.component';

describe('WelcomeTitleComponent', () => {
  let component: WelcomeTitleComponent;
  let fixture: ComponentFixture<WelcomeTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomeTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
