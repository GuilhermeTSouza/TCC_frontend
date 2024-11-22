import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CourseService } from '../services/course.service';
import { Course } from '../models/course';
import { TeacherService } from '../services/teacher.service';
import { Teacher } from '../models/teacher';
import { Area } from '../models/area';
import { AreaService } from '../services/area.service';
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
  cursoSelecionado: Course | null = null;
  exibirModal = false;
  courseName = '';
  courseAreaId = 0;
  courseAreaName = '';
  courseTeacherId = 0;
  courseTeacherName = '';
  monday = false;
  tuesday = false;
  wednesday = false;
  thursday = false;
  friday = false;
  teachers: Teacher[] = [];
  areas: Area[] = [];



  constructor(
    private courseService: CourseService,
    private teacherService: TeacherService,
    private areaService: AreaService
  ) {
    this.get_courses()
    this.get_teacher()
    this.get_areas()
  }
  get_courses() {
    this.courseService.getAllCourses().subscribe((courses) => {
      this.cursos = courses;
    });
  }
  get_teacher() {
    this.teacherService.getAllTeachers().subscribe((teachers) => {
      this.teachers = teachers;
    });
  }
  get_areas() {
    this.areaService.getAllAreas().subscribe((area) => {
      this.areas = area;
    });
  }

  abrirModal(curso?: Course) {
    this.cursoSelecionado = curso || null;
    this.courseName = curso ? curso?.name : '';
    this.courseAreaId = curso ? curso?.area_id : 0;
    this.courseAreaName = curso ? curso?.area_name : '';
    this.courseTeacherId = curso ? curso?.teacher_id : 0;
    this.courseTeacherName = curso ? curso?.teacher_name : '';
    this.monday = curso ? curso?.monday : false;
    this.tuesday = curso ? curso?.tuesday : false;
    this.wednesday = curso ? curso?.wednesday : false;
    this.thursday = curso ? curso?.thursday : false;
    this.friday = curso ? curso?.friday : false;
    this.exibirModal = true;
  }

  fecharModal() {
    this.exibirModal = false;
    this.resetarFormulario()

  }
  resetarFormulario() {
    this.cursoSelecionado = null;
    this.courseName = '';
    this.courseAreaId = 0;
    this.courseAreaName = '';
    this.courseTeacherId = 0;
    this.courseTeacherName = '';
    this.monday = false;
    this.tuesday = false;
    this.wednesday = false;
    this.thursday = false;
    this.friday = false;
  }

  salvarCurso() {
    if (this.courseName.trim()) {
      if (this.cursoSelecionado) {
        this.cursoSelecionado.name = this.courseName;
        this.cursoSelecionado.area_id = this.courseAreaId;
        this.cursoSelecionado.area_name = this.courseAreaName.trim();
        this.cursoSelecionado.teacher_id = this.courseTeacherId;
        this.cursoSelecionado.teacher_name = this.courseTeacherName;
        this.cursoSelecionado.monday = this.monday;
        this.cursoSelecionado.tuesday = this.tuesday;
        this.cursoSelecionado.wednesday = this.wednesday;
        this.cursoSelecionado.thursday = this.thursday;
        this.cursoSelecionado.friday = this.friday;

        this.courseService.edit_course(this.cursoSelecionado)
          .subscribe({
            next: () => this.get_courses(),
            error: () => alert("Erro: ")
          })

      } else {
        const novoCurso: Course = {
          id: this.cursos.length + 1,
          name: this.courseName,
          area_id: this.courseAreaId,
          area_name: this.courseAreaName,
          teacher_id: this.courseTeacherId,
          teacher_name: this.courseTeacherName,
          monday: this.monday,
          tuesday: this.tuesday,
          wednesday: this.wednesday,
          thursday: this.thursday,
          friday: this.friday

        };
        this.courseService.save_course(novoCurso)
          .subscribe({
            next: () => this.get_courses(),
            error: () => alert("Erro: ")
          })
      }
      this.fecharModal();
    }
  }

  selecionarCurso(curso: Course) {
    this.cursoSelecionado = curso;
  }

  excluirCurso(curso: Course) {
    const confirmacao = confirm(
      `Tem certeza de que deseja excluir o curso ${curso.name}?`
    );
    if (confirmacao) {
      this.courseService.delete_course(curso.id)
      .subscribe({
        next: () => this.get_courses(),
        error: () => alert("Erro: ")
      })
    }
  }



}
