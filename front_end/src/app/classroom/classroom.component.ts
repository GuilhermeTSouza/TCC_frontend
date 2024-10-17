import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClassroomService } from '../services/classroom.service';
import { Classroom } from '../models/classroom';

@Component({
  selector: 'app-classroom',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.css'],
})
export class ClassroomComponent {
  salas: Classroom[] = [];
  salaSelecionada: Classroom | null = null;
  exibirModal = false;
  salaNumero = 1;
  salaCapacidade = 1;
  salaPossuiComputador = false;

  constructor(private classroomService: ClassroomService) {
    this.get_classroom()
  }

  get_classroom() {
    this.classroomService.getAllClassrooms().subscribe((classrooms) => {
      this.salas = classrooms;
    });
  }

  abrirModal(classroom?: Classroom | null) {
    this.salaSelecionada = classroom || null;
    this.salaNumero = classroom ? classroom.number_classroom : 1;
    this.salaCapacidade = classroom ? classroom.capacity : 1;
    this.salaPossuiComputador = classroom ? classroom.computer : false;
    this.exibirModal = true;
  }

  fecharModal() {
    this.exibirModal = false;
    this.resetarFormulario();
  }

  resetarFormulario() {
    this.salaNumero = 1;
    this.salaCapacidade = 1;
    this.salaPossuiComputador = false;
    this.salaSelecionada = null;
  }

  salvarSala() {
    if (this.salaNumero > 0 && this.salaCapacidade > 0) {
      if (this.salaSelecionada) {
        this.salaSelecionada.number_classroom = this.salaNumero;
        this.salaSelecionada.capacity = this.salaCapacidade;
        this.salaSelecionada.computer = this.salaPossuiComputador;

        this.classroomService.edit_classroom(this.salaSelecionada)
          .subscribe({
            next: () => this.get_classroom(),
            error: () => alert("Erro: ")
          })

      } else {
        const novaSala: Classroom = {
          id: 0,
          number_classroom: this.salaNumero,
          capacity: this.salaCapacidade,
          computer: this.salaPossuiComputador,
        };

        this.classroomService.save_classroom(novaSala)
          .subscribe({
            next: () => this.get_classroom(),
            error: () => alert("Erro: ")
          })
      }
      this.fecharModal();
    } else {
      alert('Número da Sala e Capacidade devem ser números positivos.');
    }
  }

  selecionarSala(sala: Classroom) {
    this.salaSelecionada = sala;
  }
  excluirSala(sala: Classroom) {
    const confirmacao = confirm(`Tem certeza de que deseja excluir a sala de aula N° ${sala.number_classroom}?`);
    if (confirmacao) {
      this.classroomService.delete_classroom(sala.id)
      .subscribe({
        next: () => this.get_classroom(),
        error: () => alert("Erro: ")
      })
    }
  }
}
