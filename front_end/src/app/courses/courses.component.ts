import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CourseService } from '../services/course.service';
import { Course } from '../models/course';
import { TeacherService } from '../services/teacher.service';
import { Teacher } from '../models/teacher';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent {
  cursos: Course[] = [];
  teachers: Teacher[] = [];
  cursoSelecionado: Course | null = null;
  exibirModal = false;
  cursoNome = '';
  professores = '';
  semestreSelecionado: number | null = null;
  semestres = [1, 2, 3, 4];
  disciplinas: any[] = [[], [], [], []]; // Inicializa com 4 arrays para semestres

  constructor(private courseService: CourseService, private teacherService: TeacherService) {
    this.courseService.getAllCourses().subscribe((courses) => {
      this.cursos = courses;
    });
    this.teacherService.getAllTeachers().subscribe((teachers) => {
      this.teachers = teachers;
    });
  }

  abrirModal(curso?: Course) {
    this.cursoSelecionado = curso || null;
    this.cursoNome = curso ? curso.name : '';
    this.professores = '';
    this.semestreSelecionado = null;
    this.disciplinas = [[], [], [], []]; // Inicializa com 4 arrays para semestres
    this.exibirModal = true;
  }

  fecharModal() {
    this.exibirModal = false;
    this.cursoNome = '';
    this.cursoSelecionado = null;
    this.professores = '';
    this.semestreSelecionado = null;
    this.disciplinas = [[], [], [], []];
  }

  salvarCurso() {
    if (this.cursoNome.trim()) {
      if (this.cursoSelecionado) {
        this.cursoSelecionado.name = this.cursoNome.trim();
        // Atualizar o curso selecionado com os novos dados
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
    const confirmacao = confirm(
      `Tem certeza de que deseja excluir o curso ${curso.name}?`
    );
    if (confirmacao) {
      this.cursos = this.cursos.filter((i) => i !== curso);
    }
  }

  getColunas() {
    return Array.from({ length: this.semestreSelecionado || 0 });
  }

  adicionarDisciplina(semestreIdx: number) {
    this.disciplinas[semestreIdx].push({ nome: '', cargaHoraria: '' });
  }
}

