import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Teacher } from '../models/teacher';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  private apiUrl = `${environment.apiUrl}/teacher`;

  constructor(private http: HttpClient) {}

  getAllTeachers() {
    return this.http.get<Teacher[]>(this.apiUrl);
  }
}
