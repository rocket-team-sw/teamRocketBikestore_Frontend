import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailmoduleComponent } from './detailmodule.component';

describe('DetailmoduleComponent', () => {
  let component: DetailmoduleComponent;
  let fixture: ComponentFixture<DetailmoduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailmoduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailmoduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
