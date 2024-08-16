import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Classroom } from '../models/classroom';

@Injectable({
  providedIn: 'root',
})
export class ClassroomService {
  private apiUrl = `${environment.apiUrl}/classroom`;

  constructor(private http: HttpClient) {}

  getAllClassrooms() {
    return this.http.get<Classroom[]>(this.apiUrl);
  }
}
