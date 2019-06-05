import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordByComponent } from './change-password-by.component';

describe('ChangePasswordByComponent', () => {
  let component: ChangePasswordByComponent;
  let fixture: ComponentFixture<ChangePasswordByComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangePasswordByComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePasswordByComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
