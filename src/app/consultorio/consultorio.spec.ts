import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Consultorio } from './consultorio';

describe('Consultorio', () => {
  let component: Consultorio;
  let fixture: ComponentFixture<Consultorio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Consultorio]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Consultorio);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
