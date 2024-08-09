import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Curso {
  id: number;
  nome: string;
}

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, FormsModule], // Importando os módulos necessários
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent {
  cursos: Curso[] = [];
  cursoSelecionado: Curso | null = null;
  exibirModal = false;
  cursoNome = '';

  abrirModal(curso?: Curso) {
    this.cursoSelecionado = curso || null;
    this.cursoNome = curso ? curso.nome : '';
    this.exibirModal = true;
  }

  fecharModal() {
    this.exibirModal = false;
    this.cursoNome = '';
    this.cursoSelecionado = null;
  }

  salvarCurso() {
    if (this.cursoNome.trim()) {
      if (this.cursoSelecionado) {
        this.cursoSelecionado.nome = this.cursoNome.trim();
      } else {
        const novoCurso: Curso = {
          id: this.cursos.length + 1,
          nome: this.cursoNome.trim(),
        };
        this.cursos.push(novoCurso);
      }
      this.fecharModal();
    }
  }

  selecionarCurso(curso: Curso) {
    this.cursoSelecionado = curso;
  }

  editarCurso(curso?: Curso) {
    this.abrirModal(curso);
  }
}
