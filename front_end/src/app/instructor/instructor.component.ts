import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InstructorService } from '../services/instructor.service';
import { Instructor } from '../models/instructor';
import { Area } from '../models/area';
import { AreaService } from '../services/area.service';

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
  instrutorAreaId = 0;
  instrutorAreaNome = '';
  areas: Area[] = [];

  constructor(private instructorService: InstructorService, private areaService: AreaService) {
    this.get_instructors()
    this.get_areas()
    }
    get_instructors(){
      this.instructorService.getAllInstructors().subscribe((instructors) => {
        this.instrutores = instructors;
    });
}
    get_areas(){
        this.areaService.getAllAreas().subscribe((areas) => {
          this.areas = areas;
      });
    
  }

  abrirModal(instrutor?: Instructor | null) {
    this.instrutorSelecionado = instrutor || null;
    this.instrutorNome = instrutor ? instrutor.name : '';
    this.instrutorAreaId = instrutor ? instrutor.area_id : 0;
    this.instrutorAreaNome = instrutor ? instrutor.area_name : '';
    this.exibirModal = true;
  }

  fecharModal() {
    this.exibirModal = false;
    this.resetarFormulario();
  }

  resetarFormulario() {
    this.instrutorNome = '';
    this.instrutorAreaId = 0;
    this.instrutorAreaNome = '';
    this.instrutorSelecionado = null;
  }

  salvarInstrutor() {
    if (
      this.instrutorNome.trim() 
    ) {
      if (this.instrutorSelecionado) {
        this.instrutorSelecionado.name = this.instrutorNome;
        this.instrutorSelecionado.area_id = this.instrutorAreaId;
        this.instrutorSelecionado.area_name = this.instrutorAreaNome;

        this.instructorService.edit_instructor(this.instrutorSelecionado)
          .subscribe({
            next: () => this.get_instructors(),
            error: () => alert("Erro: ")
          })
      } else {
        const novoInstrutor: Instructor = {
          id: this.instrutores.length + 1,
          name: this.instrutorNome,
          area_id: this.instrutorAreaId,
          area_name: this.instrutorAreaNome
        };
        this.instructorService.save_instructor(novoInstrutor)
    .subscribe({
      next: () => this.get_instructors(),
      error: () => alert("Erro: ")
    })
      }
      this.fecharModal();
    } else {
      alert('Todos os campos são obrigatórios.');
    }
    
  }

 

  selecionarInstrutor(instrutor: Instructor) {    
    this.instrutorSelecionado = instrutor;
}
excluirInstrutor(instrutor: Instructor) {
  const confirmacao = confirm(`Tem certeza de que deseja excluir o instrutor ${instrutor.name}?`);
  if (confirmacao) {
    this.instructorService.delete_instructor(instrutor.id)
      .subscribe({
        next: () => this.get_instructors(),
        error: () => alert("Erro: ")
  })
}


}}
