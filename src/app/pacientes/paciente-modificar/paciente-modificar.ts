import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Paciente } from '../paciente';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-paciente-modificar',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './paciente-modificar.html',
  styleUrl: './paciente-modificar.css'
})
export class PacienteModificar implements OnInit {
  modificarForm: FormGroup;
  pacienteId!: number;
  mensajeExito: string | null = null;
  mensajeError: string | null = null;
  dniPaciente: string = '';

  constructor(
    private fb: FormBuilder,
    private paciente: Paciente,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.modificarForm = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      sexo: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      direccion: [''],
      telefono: ['', [Validators.pattern('^[0-9]{9}$')]],
      email: ['', [Validators.email]],
      alergias: [''],
      antecedentes: [''],
      enfermedadesCronicas: ['']
    });
  }

  ngOnInit(): void {
    this.pacienteId = this.route.snapshot.params['id'];
    this.paciente.obtenerPacientePorId(this.pacienteId).subscribe(data => {
      this.modificarForm.patchValue(data); 
    });
  }

  onGuardarCambios(): void {
    if (this.modificarForm.invalid) {
      this.mensajeError = "Por favor, revise los campos del formulario.";
      return;
    }
    this.paciente.modificarPaciente(this.pacienteId, this.modificarForm.value).subscribe({
      next: () => {
        this.mensajeExito = "Datos del paciente actualizados con éxito.";
      },
      error: (err) => {
        this.mensajeError = "Ocurrió un error al guardar los cambios.";
        console.error(err);
      }
    });
  }

  inactivar(): void {
    if (confirm('¿Está seguro que desea inactivar a este paciente?')) {
      this.paciente.inactivarPaciente(this.pacienteId).subscribe(() => {
        this.router.navigate(['/pacientes/registrados']);
      });
    }
  }

  volver(): void {
    this.router.navigate(['/pacientes/registrados']);
  }
}
