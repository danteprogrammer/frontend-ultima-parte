import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteBusqueda } from './paciente-busqueda';

describe('PacienteBusqueda', () => {
  let component: PacienteBusqueda;
  let fixture: ComponentFixture<PacienteBusqueda>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PacienteBusqueda]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PacienteBusqueda);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
