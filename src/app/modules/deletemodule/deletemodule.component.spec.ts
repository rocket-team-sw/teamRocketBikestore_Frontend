import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletemoduleComponent } from './deletemodule.component';

describe('DeletemoduleComponent', () => {
  let component: DeletemoduleComponent;
  let fixture: ComponentFixture<DeletemoduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletemoduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletemoduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
