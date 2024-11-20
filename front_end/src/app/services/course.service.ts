import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private apiUrl = `${environment.apiUrl}/course`;

  constructor(private http: HttpClient) {}

  getAllCourses() {
    console.log('Chamando API:', this.apiUrl);
    return this.http.get<Course[]>(this.apiUrl);
  }

  save_course(novoCurso : Course){
    return this.http.post(`${environment.apiUrl}/course`,novoCurso)
  }

  delete_course(cursoId: number){
    return this.http.delete(`${environment.apiUrl}/course/${cursoId}`)
  }
  edit_course(curso: Course){
    return this.http.put(`${environment.apiUrl}/course`, curso)
  }
}
