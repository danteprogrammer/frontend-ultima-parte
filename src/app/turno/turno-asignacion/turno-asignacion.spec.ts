import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnoAsignacion } from './turno-asignacion';

describe('TurnoAsignacion', () => {
  let component: TurnoAsignacion;
  let fixture: ComponentFixture<TurnoAsignacion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TurnoAsignacion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TurnoAsignacion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
