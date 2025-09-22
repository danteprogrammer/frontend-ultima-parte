import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-consultorio',
  imports: [CommonModule],
  templateUrl: './consultorio.html',
  styleUrl: './consultorio.css'
})
export class Consultorio implements OnInit {

  consultorios: any[] = [];
  loading: boolean = false;
  error: string | null = null;

  private apiUrl = 'http://localhost:8080/api/consultorios';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarConsultorios();
  }

  cargarConsultorios(): void {
    this.loading = true;
    this.error = null;

    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.consultorios = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar consultorios', err);
        this.error = 'No se pudieron cargar los consultorios.';
        this.loading = false;
      }
    });
  }

  getEstadoClass(estado: string): string {
    switch (estado) {
      case 'Disponible': return 'estado-disponible';
      case 'Ocupado': return 'estado-ocupado';
      case 'Mantenimiento': return 'estado-mantenimiento';
      default: return 'estado-desconocido';
    }
  }

  getEstadoIcon(estado: string): string {
    switch (estado) {
      case 'Disponible': return '✅';
      case 'Ocupado': return '⛔';
      case 'Mantenimiento': return '🛠️';
      default: return '❓';
    }
  }
}