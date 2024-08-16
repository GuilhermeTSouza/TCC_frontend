import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InstructorService } from '../services/instructor.service';
import { Instructor } from '../models/instructor';

@Component({
  selector: 'app-instructor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './instructor.component.html',
  styleUrls: ['./instructor.component.css'],
})
export class InstructorComponent {
  instrutores: Instructor[] = [];
  instrutorSelecionado: Instructor | null = null;
  exibirModal = false;
  instrutorNome = '';
  instrutorEmail = '';
  instrutorArea = '';

  constructor(private instructorService: InstructorService) {
    this.instructorService.getAllInstructors().subscribe((instructors) => {
      this.instrutores = instructors;
    });
  }

  abrirModal(instrutor?: Instructor | null) {
    this.instrutorSelecionado = instrutor || null;
    this.instrutorNome = instrutor ? instrutor.name : '';
    this.instrutorEmail = instrutor ? instrutor.email : '';
    this.instrutorArea = instrutor ? instrutor.area : '';
    this.exibirModal = true;
  }

  fecharModal() {
    this.exibirModal = false;
    this.resetarFormulario();
  }

  resetarFormulario() {
    this.instrutorNome = '';
    this.instrutorEmail = '';
    this.instrutorArea = '';
    this.instrutorSelecionado = null;
  }

  salvarInstrutor() {
    if (
      this.instrutorNome.trim() &&
      this.instrutorEmail.trim() &&
      this.instrutorArea.trim()
    ) {
      if (this.instrutorSelecionado) {
        this.instrutorSelecionado.name = this.instrutorNome.trim();
        this.instrutorSelecionado.email = this.instrutorEmail.trim();
        this.instrutorSelecionado.area = this.instrutorArea.trim();
      } else {
        const novoInstrutor: Instructor = {
          id: this.instrutores.length + 1,
          name: this.instrutorNome.trim(),
          email: this.instrutorEmail.trim(),
          area: this.instrutorArea.trim(),
        };
        this.instrutores.push(novoInstrutor);
      }
      this.fecharModal();
    } else {
      alert('Todos os campos são obrigatórios.');
    }
  }

  selecionarInstrutor(instrutor: Instructor) {
    this.abrirModal(instrutor);
  }
}
