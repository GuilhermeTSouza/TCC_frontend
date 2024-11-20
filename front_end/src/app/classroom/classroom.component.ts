import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClassroomService } from '../services/classroom.service';
import { Classroom } from '../models/classroom';
import { AreaService } from '../services/area.service';
import { Area } from '../models/area';

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
  salaNome = '';
  salaAreaId = 0;
  salaAreaNome='';
  salaLugares = 0;
  areas: Area[] = [];

  constructor(private classroomService: ClassroomService, private areaService: AreaService) {
    this.get_classroom();
    this.get_areas();
  }

  get_classroom() {
    this.classroomService.getAllClassrooms().subscribe((classrooms) => {
      this.salas = classrooms;
    });
  }

  get_areas(){
    this.areaService.getAllAreas().subscribe((area) => {
      this.areas = area;
    });
  }

  abrirModal(classroom?: Classroom | null) {
    this.salaSelecionada = classroom || null;
    this.salaNome = classroom ? classroom.name : '';
    this.salaAreaId = classroom ? classroom.area_id : 0;
    this.salaAreaNome = classroom ? classroom.area_name : '';
    this.salaLugares = classroom ? classroom.nb_places : 0;
    this.exibirModal = true;
  }

  fecharModal() {
    this.exibirModal = false;
    this.resetarFormulario();
  }

  resetarFormulario() {
    this.salaNome = '';
    this.salaAreaId = 0;
    this.salaAreaNome='';
    this.salaLugares = 0;
    this.salaSelecionada = null;
  }

  salvarSala() {
    if (this.salaNome.trim()) {
      if (this.salaSelecionada) {
        this.salaSelecionada.name = this.salaNome;
        this.salaSelecionada.area_id = this.salaAreaId;
        this.salaSelecionada.nb_places = this.salaLugares;

        this.classroomService.edit_classroom(this.salaSelecionada)
          .subscribe({
            next: () => this.get_classroom(),
            error: () => alert("Erro: ")
          })

      } else {
        const novaSala: Classroom = {
          id: this.salas.length + 1,
          name: this.salaNome,
          area_id: this.salaAreaId,
          area_name: this.salaAreaNome,
          nb_places: this.salaLugares,
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
    const confirmacao = confirm(`Tem certeza de que deseja excluir a sala de aula N° ${sala.name}?`);
    if (confirmacao) {
      this.classroomService.delete_classroom(sala.id)
      .subscribe({
        next: () => this.get_classroom(),
        error: () => alert("Erro: ")
      })
    }
  }
}
