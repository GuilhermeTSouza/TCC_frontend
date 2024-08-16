import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Instructor } from '../models/instructor';

@Injectable({
  providedIn: 'root',
})
export class InstructorService {
  private apiUrl = `${environment.apiUrl}/instructor`;

  constructor(private http: HttpClient) {}

  getAllInstructors() {
    return this.http.get<Instructor[]>(this.apiUrl);
  }
}
