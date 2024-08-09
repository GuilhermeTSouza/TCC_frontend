import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Docente {
  id: number;
  nome: string;
  email: string;
  area: string;
}

@Component({
  selector: 'app-teacher',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './teacher.component.html',
  styleUrl: './teacher.component.css',
})
export class TeacherComponent {
  docentes: Docente[] = [];
  docenteSelecionado: Docente | null = null;
  exibirModal = false;
  docenteNome = '';
  docenteEmail = '';
  docenteArea = '';

  abrirModal(docente?: Docente | null) {
    this.docenteSelecionado = docente || null;
    this.docenteNome = docente ? docente.nome : '';
    this.docenteEmail = docente ? docente.email : '';
    this.docenteArea = docente ? docente.area : '';
    this.exibirModal = true;
  }

  fecharModal() {
    this.exibirModal = false;
    this.resetarFormulario();
  }

  resetarFormulario() {
    this.docenteNome = '';
    this.docenteEmail = '';
    this.docenteArea = '';
    this.docenteSelecionado = null;
  }

  salvarDocente() {
    if (
      this.docenteNome.trim() &&
      this.docenteEmail.trim() &&
      this.docenteArea.trim()
    ) {
      if (this.docenteSelecionado) {
        this.docenteSelecionado.nome = this.docenteNome.trim();
        this.docenteSelecionado.email = this.docenteEmail.trim();
        this.docenteSelecionado.area = this.docenteArea.trim();
      } else {
        const novoDocente: Docente = {
          id: this.docentes.length + 1,
          nome: this.docenteNome.trim(),
          email: this.docenteEmail.trim(),
          area: this.docenteArea.trim(),
        };
        this.docentes.push(novoDocente);
      }
      this.fecharModal();
    } else {
      alert('Todos os campos são obrigatórios.');
    }
  }

  selecionarDocente(docente: Docente) {
    this.docenteSelecionado = docente;
  }
}
