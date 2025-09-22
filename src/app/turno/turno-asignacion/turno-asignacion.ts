import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-turno-asignacion',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './turno-asignacion.html',
  styleUrls: ['./turno-asignacion.css']
})
export class TurnoAsignacion implements OnInit {

  asignacionForm!: FormGroup;
  mensajeExito: string | null = null;
  mensajeError: string | null = null;
  cargando: boolean = false;

  consultorios: any[] = [];

  private apiUrl = 'http://localhost:8080/api/turnos';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.asignacionForm = this.fb.group({
      pacienteId: ['', [Validators.required]],
      consultorioId: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      hora: ['', [Validators.required]],
      motivo: ['', [Validators.required, Validators.minLength(3)]],
      observaciones: ['']
    });

    this.cargarConsultorios();
  }

  cargarConsultorios(): void {
    this.http.get<any[]>('http://localhost:8080/api/consultorios')
      .subscribe({
        next: (data) => {
          this.consultorios = data;
        },
        error: (err) => {
          console.error('Error al cargar consultorios', err);
        }
      });
  }

  getMinDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  onSubmit(): void {
    if (this.asignacionForm.invalid) {
      this.mensajeError = 'Por favor completa todos los campos obligatorios.';
      return;
    }

    this.cargando = true;
    this.mensajeExito = null;
    this.mensajeError = null;

    this.http.post(this.apiUrl, this.asignacionForm.value)
      .subscribe({
        next: () => {
          this.mensajeExito = 'Turno asignado correctamente ✅';
          this.asignacionForm.reset();
          this.cargando = false;
        },
        error: (err) => {
          console.error('Error al asignar turno', err);
          this.mensajeError = 'Hubo un problema al asignar el turno ❌';
          this.cargando = false;
        }
      });
  }
}
