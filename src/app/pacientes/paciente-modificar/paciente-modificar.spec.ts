import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteModificar } from './paciente-modificar';

describe('PacienteModificar', () => {
  let component: PacienteModificar;
  let fixture: ComponentFixture<PacienteModificar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PacienteModificar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PacienteModificar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
