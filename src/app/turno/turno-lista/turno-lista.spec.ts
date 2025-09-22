import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnoLista } from './turno-lista';

describe('TurnoLista', () => {
  let component: TurnoLista;
  let fixture: ComponentFixture<TurnoLista>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TurnoLista]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TurnoLista);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
