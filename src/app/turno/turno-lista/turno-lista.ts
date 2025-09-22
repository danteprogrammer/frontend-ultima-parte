import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-turno-lista',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './turno-lista.html',
  styleUrls: ['./turno-lista.css']
})
export class TurnoLista implements OnInit {
  
  turnos: any[] = [];
  cargando: boolean = false;
  mensajeExito: string | null = null;
  mensajeError: string | null = null;

  private apiUrl = 'http://localhost:8080/api/turnos';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarTurnosProximos();
  }

  cargarTurnosProximos(): void {
    this.cargando = true;
    this.mensajeExito = null;
    this.mensajeError = null;

    this.http.get<any[]>(`${this.apiUrl}/proximos`)
      .subscribe({
        next: (data) => {
          this.turnos = data;
          this.cargando = false;
        },
        error: (err) => {
          console.error('Error al cargar turnos', err);
          this.mensajeError = 'Error al cargar los turnos próximos.';
          this.cargando = false;
        }
      });
  }

  cambiarEstadoTurno(turno: any, nuevoEstado: string): void {
    this.http.put(`${this.apiUrl}/${turno.idTurno}/estado`, { estado: nuevoEstado })
      .subscribe({
        next: () => {
          turno.estado = nuevoEstado;
          this.mensajeExito = `El turno #${turno.idTurno} ahora está en estado ${this.getEstadoLabel(nuevoEstado)} ✅`;
        },
        error: (err) => {
          console.error('Error al cambiar estado del turno', err);
          this.mensajeError = 'No se pudo actualizar el estado del turno ❌';
        }
      });
  }

  cancelarTurno(turno: any): void {
    this.http.put(`${this.apiUrl}/${turno.idTurno}/cancelar`, {})
      .subscribe({
        next: () => {
          turno.estado = 'Cancelado';
          this.mensajeExito = `El turno #${turno.idTurno} fue cancelado.`;
        },
        error: (err) => {
          console.error('Error al cancelar turno', err);
          this.mensajeError = 'No se pudo cancelar el turno ❌';
        }
      });
  }

  getEstadoClass(estado: string): string {
    switch (estado) {
      case 'Pendiente': return 'estado-pendiente';
      case 'Confirmado': return 'estado-confirmado';
      case 'EnProceso': return 'estado-proceso';
      case 'Completado': return 'estado-completado';
      case 'Cancelado': return 'estado-cancelado';
      default: return '';
    }
  }

  getEstadoLabel(estado: string): string {
    switch (estado) {
      case 'Pendiente': return 'Pendiente';
      case 'Confirmado': return 'Confirmado';
      case 'EnProceso': return 'En Proceso';
      case 'Completado': return 'Completado';
      case 'Cancelado': return 'Cancelado';
      default: return 'Desconocido';
    }
  }
}
