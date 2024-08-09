import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Sala {
  id: number;
  numero: string;
  capacidade: number;
  possuiComputador: boolean;
}

@Component({
  selector: 'app-classroom',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.css'],
})
export class ClassroomComponent {
  salas: Sala[] = [];
  salaSelecionada: Sala | null = null;
  exibirModal = false;
  salaNumero = '';
  salaCapacidade = 1; // Valor inicial positivo
  salaPossuiComputador = false;

  abrirModal(sala?: Sala | null) {
    this.salaSelecionada = sala || null;
    this.salaNumero = sala ? sala.numero : '';
    this.salaCapacidade = sala ? sala.capacidade : 1; // Valor inicial positivo
    this.salaPossuiComputador = sala ? sala.possuiComputador : false;
    this.exibirModal = true;
  }

  fecharModal() {
    this.exibirModal = false;
    this.resetarFormulario();
  }

  resetarFormulario() {
    this.salaNumero = '';
    this.salaCapacidade = 1; // Valor inicial positivo
    this.salaPossuiComputador = false;
    this.salaSelecionada = null;
  }

  salvarSala() {
    if (this.salaNumero.trim() && this.salaCapacidade > 0) {
      if (this.salaSelecionada) {
        this.salaSelecionada.numero = this.salaNumero.trim();
        this.salaSelecionada.capacidade = this.salaCapacidade;
        this.salaSelecionada.possuiComputador = this.salaPossuiComputador;
      } else {
        const novaSala: Sala = {
          id: this.salas.length + 1,
          numero: this.salaNumero.trim(),
          capacidade: this.salaCapacidade,
          possuiComputador: this.salaPossuiComputador,
        };
        this.salas.push(novaSala);
      }
      this.fecharModal();
    } else {
      alert('Capacidade deve ser um número positivo.');
    }
  }

  selecionarSala(sala: Sala) {
    this.salaSelecionada = sala;
  }
}
