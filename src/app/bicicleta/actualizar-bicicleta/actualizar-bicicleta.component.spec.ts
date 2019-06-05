import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarBicicletaComponent } from './actualizar-bicicleta.component';

describe('ActualizarBicicletaComponent', () => {
  let component: ActualizarBicicletaComponent;
  let fixture: ComponentFixture<ActualizarBicicletaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualizarBicicletaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarBicicletaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
