import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateonlyModuleComponent } from './createonly-module.component';

describe('CreateonlyModuleComponent', () => {
  let component: CreateonlyModuleComponent;
  let fixture: ComponentFixture<CreateonlyModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateonlyModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateonlyModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
