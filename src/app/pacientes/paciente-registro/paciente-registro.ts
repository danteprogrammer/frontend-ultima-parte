import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Paciente } from '../paciente';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-paciente-registro',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './paciente-registro.html',
  styleUrl: './paciente-registro.css'
})
export class PacienteRegistro {
  registroForm: FormGroup;
  mensajeExito: string | null = null;
  mensajeError: string | null = null;

  constructor(private fb: FormBuilder, private paciente: Paciente) {
    this.registroForm = this.fb.group({
      dni: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      sexo: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      direccion: [''],
      telefono: ['', [Validators.pattern('^[0-9]{9}$')]],
      email: ['', [Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.registroForm.invalid) {
      this.mensajeError = "Por favor, complete todos los campos requeridos correctamente.";
      return;
    }

    this.mensajeExito = null;
    this.mensajeError = null;

    this.paciente.registrarPaciente(this.registroForm.value).subscribe({
      next: (pacienteRegistrado) => {
        this.mensajeExito = `Paciente ${pacienteRegistrado.nombres} ${pacienteRegistrado.apellidos} registrado con éxito.`;
        this.registroForm.reset();
      },
      error: (err) => {
        this.mensajeError = err.error?.message || 'Ocurrió un error al registrar el paciente.';
        console.error(err);
      }
    });
  }
}
