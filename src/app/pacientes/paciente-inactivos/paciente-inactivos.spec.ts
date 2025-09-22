import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteInactivos } from './paciente-inactivos';

describe('PacienteInactivos', () => {
  let component: PacienteInactivos;
  let fixture: ComponentFixture<PacienteInactivos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PacienteInactivos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PacienteInactivos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
