import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CourseService } from '../services/course.service';
import { Course } from '../models/course';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, FormsModule], // Importando os módulos necessários
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent {
  cursos: Course[] = [];
  cursoSelecionado: Course | null = null;
  exibirModal = false;
  cursoNome = '';

  constructor(private courseService: CourseService) {
    this.courseService.getAllCourses().subscribe((courses) => {
      this.cursos = courses;
    });
  }

  abrirModal(curso?: Course) {
    this.cursoSelecionado = curso || null;
    this.cursoNome = curso ? curso.name : '';
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
        this.cursoSelecionado.name = this.cursoNome.trim();
      } else {
        const novoCurso: Course = {
          id: this.cursos.length + 1,
          name: this.cursoNome.trim(),
        };
        this.cursos.push(novoCurso);
      }
      this.fecharModal();
    }
  }

  selecionarCurso(curso: Course) {
    this.cursoSelecionado = curso;
  }

  excluirCurso(curso: any) {
    const confirmacao = confirm(`Tem certeza de que deseja excluir o curso ${curso.name}?`);
    if (confirmacao) {
      this.cursos = this.cursos.filter(i => i !== curso);
    }
  }
}
