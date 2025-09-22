import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Paciente } from '../paciente';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-paciente-busqueda',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './paciente-busqueda.html',
  styleUrl: './paciente-busqueda.css'
})
export class PacienteBusqueda implements OnInit {
  busquedaForm: FormGroup;
  pacientes: Paciente[] = [];
  busquedaRealizada = false;

  currentPage = 0;
  pageSize = 10;
  totalPages = 0;

  constructor(private fb: FormBuilder, private paciente: Paciente) {
    this.busquedaForm = this.fb.group({
      termino: [''],
      filtro: ['nombre']
    });
  }

  ngOnInit(): void {
    this.buscarPacientes();
  }

  buscarPacientes(): void {
    const { termino, filtro } = this.busquedaForm.value;
    this.paciente.buscarPacientesActivos(termino, filtro, this.currentPage, this.pageSize)
      .subscribe(pagina => {
        this.pacientes = pagina.content;
        this.totalPages = pagina.totalPages;
        this.busquedaRealizada = true;
      });
  }

  irAPagina(pagina: number): void {
    this.currentPage = pagina;
    this.buscarPacientes();
  }

  inactivar(paciente: Paciente): void {
    if (confirm(`¿Está seguro que desea inactivar al paciente ${paciente.nombres} ${paciente.apellidos}?`)) {
      this.paciente.inactivarPaciente(paciente.idPaciente!).subscribe(() => {
        alert('Paciente inactivado con éxito');
        this.buscarPacientes();
      });
    }
  }
}
