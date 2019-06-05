import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarBicicletaComponent } from './listar-bicicleta.component';

describe('ListarBicicletaComponent', () => {
  let component: ListarBicicletaComponent;
  let fixture: ComponentFixture<ListarBicicletaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarBicicletaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarBicicletaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
