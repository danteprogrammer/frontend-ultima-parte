import { Component, OnInit } from '@angular/core';
import { Paciente } from '../paciente';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-paciente-inactivos',
  imports: [CommonModule, RouterModule],
  templateUrl: './paciente-inactivos.html',
  styleUrl: './paciente-inactivos.css'
})
export class PacienteInactivos implements OnInit {
  pacientes: Paciente[] = [];

  currentPage = 0;
  pageSize = 10;
  totalPages = 0;

  constructor(private paciente: Paciente) { }

  ngOnInit(): void {
    this.cargarInactivos(); 
  }

  cargarInactivos(): void {
    this.paciente.buscarPacientesInactivos(this.currentPage, this.pageSize)
      .subscribe(pagina => {
        this.pacientes = pagina.content;
        this.totalPages = pagina.totalPages;
      });
  }

  irAPagina(pagina: number): void {
    this.currentPage = pagina;
    this.cargarInactivos();
  }

  activar(paciente: Paciente): void {
    if (confirm(`¿Está seguro que desea volver a activar al paciente ${paciente.nombres} ${paciente.apellidos}?`)) {
      this.paciente.activarPaciente(paciente.idPaciente!).subscribe(() => {
        alert('Paciente activado con éxito.');
        this.cargarInactivos();
      });
    }
  }
}
