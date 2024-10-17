import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TeacherService } from '../services/teacher.service';
import { Teacher } from '../models/teacher';

@Component({
  selector: 'app-teacher',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css'], // Correção do nome da propriedade
})
export class TeacherComponent {
  docentes: Teacher[] = [];
  docenteSelecionado: Teacher | null = null;
  exibirModal = false;
  docenteNome = '';
  docenteEmail = '';
  docenteArea = '';

  constructor(private teacherService: TeacherService) {
    this.get_teacher
    }
  get_teacher(){
    this.teacherService.getAllTeachers().subscribe((teachers) => {
      this.docentes = teachers;
  });
  }

  abrirModal(docente?: Teacher | null) {
    this.docenteSelecionado = docente || null;
    this.docenteNome = docente ? docente.name : '';
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
        this.docenteSelecionado.name = this.docenteNome.trim();
        this.docenteSelecionado.email = this.docenteEmail.trim();
        this.docenteSelecionado.area = this.docenteArea.trim();
        this.teacherService.edit_teacher(this.docenteSelecionado)
          .subscribe({
            next: () => this.get_teacher(),
            error: () => alert("Erro: ")
          })
      } else {
        const novoDocente: Teacher = {
          id: this.docentes.length + 1,
          name: this.docenteNome.trim(),
          email: this.docenteEmail.trim(),
          area: this.docenteArea.trim(),
        };
        this.teacherService.save_teacher(novoDocente)
    .subscribe({
      next: () => this.get_teacher(),
      error: () => alert("Erro: ")
    })
      }
      this.fecharModal();
    } else {
      alert('Todos os campos são obrigatórios.');
    }
  }

  selecionarDocente(docente: Teacher) {
    this.docenteSelecionado = docente;
  }

  excluirDocente(docente: any) {
    const confirmacao = confirm(`Tem certeza de que deseja excluir o docente ${docente.name}?`);
    if (confirmacao) {
      this.teacherService.delete_teacher(docente.id)
      .subscribe({
        next: () => this.get_teacher(),
        error: () => alert("Erro: ")
    })
  }
}
}
