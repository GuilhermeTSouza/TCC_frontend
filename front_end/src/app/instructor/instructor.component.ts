import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Instrutor {
  id: number;
  nome: string;
  email: string;
  area: string;
}

@Component({
  selector: 'app-instructor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './instructor.component.html',
  styleUrls: ['./instructor.component.css'],
})
export class InstructorComponent {
  instrutores: Instrutor[] = [];
  instrutorSelecionado: Instrutor | null = null;
  exibirModal = false;
  instrutorNome = '';
  instrutorEmail = '';
  instrutorArea = '';

  abrirModal(instrutor?: Instrutor | null) {
    this.instrutorSelecionado = instrutor || null;
    this.instrutorNome = instrutor ? instrutor.nome : '';
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
        this.instrutorSelecionado.nome = this.instrutorNome.trim();
        this.instrutorSelecionado.email = this.instrutorEmail.trim();
        this.instrutorSelecionado.area = this.instrutorArea.trim();
      } else {
        const novoInstrutor: Instrutor = {
          id: this.instrutores.length + 1,
          nome: this.instrutorNome.trim(),
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

  selecionarInstrutor(instrutor: Instrutor) {
    this.instrutorSelecionado = instrutor;
  }
}
