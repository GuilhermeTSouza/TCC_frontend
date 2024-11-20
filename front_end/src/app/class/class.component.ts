import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CourseService } from '../services/course.service';
import { Course } from '../models/course';
import { HorarioService } from '../services/horario.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-class',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './class.component.html',
  styleUrl: './class.component.css'
})

export class ClassComponent {
  cursos: Course[] = [];
  horarioCursoId = 0;
  dataDeInicio = '';

  constructor(private courseService: CourseService, private horarioService: HorarioService) {
    this.get_course();
  }

  get_course() {
    this.courseService.getAllCourses().subscribe((course) => {
      this.cursos = course;
      console.log('Cursos carregados:', this.cursos);
    });
  }

  downloadExcel() {
    this.horarioService.downloadExcel(this.horarioCursoId, this.dataDeInicio).subscribe(response => {
      const excelBase64 = response.excel_base64; // Pega a base64 da resposta
      const fileName = 'horario.xlsx';
      const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      this.downloadFile(excelBase64, fileName, fileType);
    });
  }

  downloadFile(base64Data: string, fileName: string, fileType: string) {
    const linkSource = `data:${fileType};base64,${base64Data}`;
    const downloadLink = document.createElement('a');
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }
  
  
}
